from rest_framework import serializers
from .models import User_profile
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError



class UserProfile(serializers.ModelSerializer):

    class Meta:
        model = User_profile
        fields=['user', 'first_name', 'Last_name', 'bio', 'Phone',  'facebook_Link', 'twitter_link', 'linkdin_link', 'github_link','image']
        extra_kwargs = {'user':{'read_only':True}}



    # def validate(self, data):
    #     facebook = data['facebook_Link']

    #     validates = URLValidator()
    #     try:
    #         validates(facebook) 
    #     except:
    #         raise serializers.ValidationError({'facebook':'please provide a valid link'}) 
    
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

        
