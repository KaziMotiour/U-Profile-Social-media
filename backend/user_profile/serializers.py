from rest_framework import serializers
from .models import PostBookmark, User_profile, UserFollow
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.contrib.auth import  get_user_model
from UserPost.models import UserPost
from UserPost.serializers import PostSerializer
from django_filters import rest_framework as filters
    
User= get_user_model()


class UserSearchFilter(filters.FilterSet):
    # min_price = django_filters.NumberFilter(name="price", lookup_expr='gte')
    # max_price = django_filters.NumberFilter(name="price", lookup_expr='lte')
    class Meta:
        model = User
        fields = ['username']  


class UserInfoSrializer(serializers.ModelSerializer):
    class Meta:
        model = User_profile
        fields=['id', 'image']
# for post user 
class PostUserDetailsSerializer(serializers.ModelSerializer):
        full_name = serializers.SerializerMethodField(read_only=True)
        profile = UserInfoSrializer(read_only=True)
        is_following = serializers.SerializerMethodField(read_only=True)
        class Meta:
            model = User
            fields=['id', 'username', 'full_name', 'profile', 'is_following' ]

        def get_full_name(self, obj):
            user = User_profile.objects.filter(user__username=obj.username).first()
            return str(user.first_name)+' '+ str(user.Last_name)
        
        def get_is_following(self, obj):   
            print(obj)
            request = self.context.get("request")
            user = UserFollow.objects.filter(user=request.user).first()
            if obj in user.following.all():
                return True
            else:
                return False

class RecomendedUserList(serializers.ModelSerializer):
        full_name = serializers.SerializerMethodField(read_only=True)
        profile = UserInfoSrializer(read_only=True)
        mutual_friends = serializers.SerializerMethodField(read_only=True,)
        class Meta:
            model = User
            fields=['id', 'username', 'full_name', 'profile', 'mutual_friends' ]

        def get_full_name(self, obj):
            user = User_profile.objects.filter(user__username=obj.username).first()
            return str(user.first_name)+' '+ str(user.Last_name)

        def get_mutual_friends(self, obj):
            mutual_friend = 0
            request = self.context.get("request")
            requested_user =UserFollow.objects.filter(user=request.user).first()
            recomended_user = UserFollow.objects.filter(user=obj).first() 
            for user in recomended_user.following.all():
                if user in  requested_user.following.all():
                    mutual_friend+=1

            return mutual_friend



# for user details
class UserProfile(serializers.ModelSerializer):
    users_name = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    followed_by = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User_profile
        fields=['id','user', 'first_name', 'Last_name', 'bio','occupations', 'gander', 'relationship_status', 'location', 'Phone',  'facebook_Link', 'twitter_link', 'linkdin_link', 'github_link','image', 'cover_picture', 'users_name','is_following','following','followed_by' ]
        
        extra_kwargs = {'user':{'read_only':True}}

    # def validate(self, data):
    #     facebook = data['facebook_Link']

    #     validates = URLValidator()
    #     try:
    #         validates(facebook) 
    #     except:
    #         raise serializers.ValidationError({'facebook':'please provide a valid link'}) 

    def get_users_name(self, obj):
        request = self.context.get("request")
        return User.objects.all().count()

    def get_is_following(self, obj):
        request = self.context.get("request")
        user =UserFollow.objects.filter(user=request.user).first()
        if obj.user in user.following.all():
            return True
        else:
            return False

    def get_following(self, obj):
        user = UserFollow.objects.filter(user__username=obj.user.username).first()
        if user:
            return user.following.count()
        return 0
        
    def get_followed_by(self, obj):
        user = UserFollow.objects.filter(user__username=obj.user.username).first()
        # user = User.objects.filter(username=obj).first()
        if user:
            return user.followed_by.count()
        
        # print(users.UserFollowing.all().count(), 'following')
        return 0


    def validate_facebook_Link(self, value):
        validates = URLValidator()
        if value=='':
            return value
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'facebook':'please provide a valid link'}) 
    
    def validate_twitter_link(self, value):
        validates = URLValidator()
        if value=='':
            return value
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'twitter':'please provide a valid link'}) 
    
    def validate_linkdin_link(self, value):
        validates = URLValidator()
        if value=='':
            return value
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'linkdin':'please provide a valid link'}) 
    
    def validate_github_link(self, value):
        validates = URLValidator()
        if value=='':
            return value
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'github':'please provide a valid link'}) 

        

# class PostSerializerForUser(serializers.ModelSerializer):
#     likes = serializers.SerializerMethodField(read_only=True)
#     class Meta:
#         model = UserPost
#         fields = ['id','parent', 'user', 'content', 'image', 'likes', 'timestamp', 'is_retweet']


    # def get_likes(self, obj):
    #     return obj.likes.count()



# full user detailsUserProfile
class UserSerializer(serializers.ModelSerializer):
        full_name = serializers.SerializerMethodField(read_only=True)
        name = serializers.SerializerMethodField(read_only=True)
        profile = UserProfile(read_only=True)
        class Meta:
            model = User
            fields=['username', 'id','full_name','profile', 'name']
            

        def get_full_name(self, obj):
            user = User_profile.objects.filter(user=obj).first()
            return str(user.first_name)+' '+ str(user.Last_name)
        
        def get_name(self, obj):
            user = User_profile.objects.filter(user=obj).first()
            return str(user.first_name)+'_'+ str(user.Last_name)

        # def get_profilePic(self, obj):
        #     user = User_profile.objects.filter(user=obj).first()
        #     return user.image.url


# post bookmark
class PostBookmarkSerializer(serializers.ModelSerializer):
    user = PostUserDetailsSerializer(read_only=True)
    post=PostSerializer(many=True)
    class Meta:
        model=PostBookmark
        fields=['user', 'post']


class FollowingOrFollower(serializers.ModelSerializer):
        # following = PostUserDetailsSerializer(read_only=True)
        class Meta:
            model = UserFollow
            fields = ['user', 'following', 'followed_by']


class FollowdByUser(serializers.ModelSerializer):
        # followed_by=PostUserDetailsSerializer(read_only=True)
        class Meta:
            model = UserFollow
            fields = ['user', 'following', 'followed_by']

        