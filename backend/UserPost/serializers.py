from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import  get_user_model
User= get_user_model()
from .models import UserPost, PostComment
from user_profile.models import User_profile, PostBookmark

# Post User deatails
class PostUserDetailsSerializers(serializers.ModelSerializer):
        full_name = serializers.SerializerMethodField(read_only=True)
        profilePic = serializers.SerializerMethodField(read_only=True)
        class Meta:
            model = User
            fields=['id', 'username', 'full_name', 'profilePic']

        def get_full_name(self, obj):
            user = User_profile.objects.filter(user=obj).first()
            return str(user.first_name)+' '+ str(user.Last_name)

        def get_profilePic(self, obj):
            user = User_profile.objects.filter(user=obj).first()
            return user.image.url




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
class PostCommentSerializer(serializers.ModelSerializer):
    user = PostUserDetailsSerializers(read_only=True)
    class Meta:
        model = PostComment
        fields = ['id', 'user', 'post', 'comment', 'create_date']
        extra_kwargs = {'create_date':{'read_only':True}}





# getPost Serializer
class PostSerializer(serializers.ModelSerializer): 
    likes = serializers.SerializerMethodField(read_only=True)
    is_saved = serializers.SerializerMethodField(read_only=True)
    parent = TweetParentSerializer(read_only=True)
    user = PostUserDetailsSerializers(read_only=True)
    sharePostContent = serializers.CharField(max_length=1000, required=False)
    postComment = PostCommentSerializer(many=True, read_only=True)
    class Meta:
        model = UserPost
        fields = ['id','parent', 'user', 'content', 'image', 'timestamp', 'is_retweet', 'is_saved', 'likes', 'sharePostContent','postComment']


    def get_likes(self, obj):
        return obj.likes.count()
        
    def get_is_saved(self, obj):
        request  = self.context.get('request')
        user=request.user
        Bookmark_user= PostBookmark.objects.get(user__username=user.username)
        print(Bookmark_user, obj.id)
        post = UserPost.objects.filter(id=obj.id).first()
        print(post)
        if post in Bookmark_user.post.all():
            return True
        else:
            return False
        


# CreatePost serializer
class PostCreateSerializer(serializers.ModelSerializer):
    user =serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserPost
        fields = ['user', 'content', 'image', 'timestamp']

    
