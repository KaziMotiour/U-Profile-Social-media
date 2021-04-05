from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import  get_user_model
User= get_user_model()
from .models import UserPost, PostComment
from user_profile.models import User_profile, PostBookmark, UserFollow
from django_filters import rest_framework as filters
# from user_profile.serializers import PostUserDetailsSerializer


class ProductFilter(filters.FilterSet):
    # min_price = django_filters.NumberFilter(name="price", lookup_expr='gte')
    # max_price = django_filters.NumberFilter(name="price", lookup_expr='lte')
    class Meta:
        model = UserPost
        fields = ['user__username']    

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_profile
        fields = ['id', 'image']


class PostUserDetailsSerializers(serializers.ModelSerializer):
        full_name = serializers.SerializerMethodField(read_only=True)
        profile = UserInfoSerializer(read_only=True)
        is_following = serializers.SerializerMethodField(read_only=True)
        class Meta:
            model = User
            fields=['id', 'username', 'full_name', 'profile', 'is_following']

        def get_full_name(self, obj):
            user = User_profile.objects.filter(user=obj).first()
            return str(user.first_name)+' '+ str(user.Last_name)
        
        def get_is_following(self, obj):
           
            request = self.context.get("request")
            if obj == request.user:
                return True
            else:
                user = UserFollow.objects.filter(user=request.user).first()
                if obj in user.following.all():
                    return True
                else:
                    return False



# get post parent info
class TweetParentSerializer(serializers.ModelSerializer):
    user = PostUserDetailsSerializers(read_only=True)
    class Meta:
        model = UserPost
        fields = ['id','user','content', 'image', 'timestamp']

# Share Post seiralizer
class SharePostSerializer(serializers.ModelSerializer): 
    parent = TweetParentSerializer(read_only=True)
    user = PostUserDetailsSerializers(read_only=True)
    sharePostContent = serializers.CharField(max_length=1000, required=False)
    class Meta:
        model = UserPost
        fields = ['id','parent', 'user', 'content', 'image', 'timestamp', 'is_retweet', 'sharePostContent']


# comment serializer
class PostCommentCreateSerializer(serializers.ModelSerializer):
    user = PostUserDetailsSerializers(read_only=True)
    class Meta:
        model = PostComment
        fields = ['id', 'user', 'post', 'comment', 'create_date']
        extra_kwargs = {'create_date': {'read_only': True}}
    
 




class PostCommentSerializer(serializers.ModelSerializer):
    user = PostUserDetailsSerializers(read_only=True)
    create_date = serializers.SerializerMethodField()
    class Meta:
        model = PostComment
        fields = ['id', 'user', 'post', 'comment', 'create_date' ]
    
    def get_create_date(self, obj):
        time = obj.get_create_date()
        return time
    





# getPost Serializer
class PostSerializer(serializers.ModelSerializer): 
    likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    is_saved = serializers.SerializerMethodField(read_only=True)
    parent = TweetParentSerializer(read_only=True)
    user = PostUserDetailsSerializers(read_only=True)
    sharePostContent = serializers.CharField(max_length=1000, required=False)
    postComment = PostCommentSerializer(many=True, read_only=True)
    shared_user = PostUserDetailsSerializers(read_only=True, many=True)
    timestamp = serializers.SerializerMethodField()
    class Meta:
        model = UserPost
        fields = ['id','parent', 'user', 'content', 'image', 'timestamp', 'is_retweet', 'is_saved', 'likes', 'privacy', 'sharePostContent','postComment', 'is_liked','shared_user']


    def get_likes(self, obj):
        return obj.likes.count()
        
    def get_is_saved(self, obj):
        request  = self.context.get('request')
        user=request.user
        Bookmark_user= PostBookmark.objects.get(user__username=user.username)
        post = UserPost.objects.filter(id=obj.id).first()
        if post in Bookmark_user.post.all():
            return True
        else:
            return False
    def get_is_liked(self, obj):
        request = self.context.get('request')
        user = request.user
        post = UserPost.objects.filter(id=obj.id).first()
        if user in post.likes.all():
            return True
        else:
            return False
    def get_timestamp(self, obj):
        time = obj.get_timestamp()
        return time
        


# CreatePost serializer
class PostCreateSerializer(serializers.ModelSerializer):
    user =serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserPost
        fields = ['id','user', 'content', 'image', 'timestamp']

    
