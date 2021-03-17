from rest_framework import serializers
from .models import PostBookmark, User_profile, UserFollow
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.contrib.auth import  get_user_model
from UserPost.models import UserPost
from UserPost.serializers import PostSerializer
    
User= get_user_model()



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
            request = self.context.get("request")
            if obj == request.user:
                return True
            else:
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
        fields=['id','user', 'first_name', 'Last_name', 'bio', 'Phone',  'facebook_Link', 'twitter_link', 'linkdin_link', 'github_link','image', 'users_name','is_following','following','followed_by' ]
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
        request = self.context.get("request")
        user = UserFollow.objects.filter(user__username=obj.user.username).first()
        if user:
            return user.following.count()
        return 0
        
    def get_followed_by(self, obj):
        request = self.context.get("request")
        return obj.user.UserFollowing.all().count()
        


    def validate_facebook_Link(self, value):
        validates = URLValidator()
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'facebook':'please provide a valid link'}) 
    
    def validate_twitter_link(self, value):
        validates = URLValidator()
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'facebook':'please provide a valid link'}) 
    
    def validate_linkdin_link(self, value):
        validates = URLValidator()
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'facebook':'please provide a valid link'}) 
    
    def validate_github_link(self, value):
        validates = URLValidator()
        try:
            validates(value) 
            return value
        except:
            raise serializers.ValidationError({'facebook':'please provide a valid link'}) 

        

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
        profile=UserProfile(read_only=True)
        posts = PostSerializer(read_only=True, many=True)
        class Meta:
            model = User
            fields=['id', 'username', 'full_name','profile', 'posts']

        def get_full_name(self, obj):
            user = User_profile.objects.filter(user=obj).first()
            return str(user.first_name)+' '+ str(user.Last_name)

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
