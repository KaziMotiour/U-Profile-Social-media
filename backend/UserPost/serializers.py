from rest_framework import serializers
from rest_framework.response import Response
from django.contrib.auth import  get_user_model
User= get_user_model()
from .models import UserPost
from user_profile.serializers import PostUserDetailsSerializer

# class PostSerializer(serializers.ModelSerializer):
#     likes = serializers.SerializerMethodField(read_only=True)
#     parent = TweetParentSerializer(read_only=True)
#     user = UserDetailsSerializer(read_only=True)
#     sharePostContent = serializers.CharField(max_length=1000, required=False)
#     class Meta:
#         model = Post
#         fields = ['id','parent', 'user', 'content', 'image', 'likes', 'timestamp', 'is_retweet', 'sharePostContent']


# get post parent info
class TweetParentSerializer(serializers.ModelSerializer):
    user = PostUserDetailsSerializer(read_only=True)
    class Meta:
        model = UserPost
        fields = ['id','user','content', 'image', 'timestamp']

# Share Post seiralizer
class SharePostSerializer(serializers.ModelSerializer): 
    parent = TweetParentSerializer(read_only=True)
    user = PostUserDetailsSerializer(read_only=True)
    sharePostContent = serializers.CharField(max_length=1000, required=False)
    class Meta:
        model = UserPost
        fields = ['id','parent', 'user', 'content', 'image', 'timestamp', 'is_retweet', 'sharePostContent']






# getPost Serializer
class PostSerializer(serializers.ModelSerializer): 
    likes = serializers.SerializerMethodField(read_only=True)
    parent = TweetParentSerializer(read_only=True)
    user = PostUserDetailsSerializer(read_only=True)
    sharePostContent = serializers.CharField(max_length=1000, required=False)
    class Meta:
        model = UserPost
        fields = ['id','parent', 'user', 'content', 'image', 'timestamp', 'is_retweet', 'likes', 'sharePostContent']


    def get_likes(self, obj):
        return obj.likes.count()

# CreatePost serializer
class PostCreateSerializer(serializers.ModelSerializer):
    user =serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserPost
        fields = ['user', 'content', 'image', 'timestamp']