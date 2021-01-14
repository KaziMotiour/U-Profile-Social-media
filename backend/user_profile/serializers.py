from rest_framework import serializers
from .models import User_profile, UserFollow
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.contrib.auth import  get_user_model
User= get_user_model()


class UserProfile(serializers.ModelSerializer):

    users_name = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    following = serializers.SerializerMethodField(read_only=True)
    followed_by = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User_profile
        fields=['user',  'first_name', 'Last_name', 'bio', 'Phone',  'facebook_Link', 'twitter_link', 'linkdin_link', 'github_link','image', 'users_name','is_following','following','followed_by' ]
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
        user =UserFollow.objects.get(user=request.user)
        if obj.user in user.following.all():
            return True
        else:
            return False

    def get_following(self, obj):
        request = self.context.get("request")
        user = UserFollow.objects.get(user__username=obj.user.username)
        return user.following.count()
        
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

        
