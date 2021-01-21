from django.shortcuts import render
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.decorators import api_view,  permission_classes
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permission import IsOwnerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserProfile, UserSerializer, PostBookmarkSerializer, PostBookmarkSerializer,PostUserDetailsSerializer
from .models import User_profile, PostBookmark, UserFollow
from django.contrib.auth import get_user_model
from UserPost.models import UserPost, Post
User= get_user_model()



class EditUserProfile(RetrieveUpdateAPIView):
    # permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = UserProfile
    queryset = User_profile.objects.all()

    
class get_user(ListAPIView):
    serializer_class = UserProfile
    queryset = User_profile.objects.all()



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserFollowViews(request, username):
    user = request.user
    toggle_user = User.objects.get(username__icontains=username)
    if toggle_user:
        is_following = UserFollow.objects.ToggleFollow(user, toggle_user)
        if is_following:
            return Response({"follow": "True"})
        else:
            return Response({"follow": "False"})
    else:
        return Response({"toggle_user": "Connot found"}) 
    





@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def ToggleBookmarkViews(request, pk):
    user = request.user
    post = UserPost.objects.filter(pk=pk).first()
   
    if post:
        is_bookmark = PostBookmark.objects.TogglePostBookmark(user, post)

        if is_bookmark:
            return Response({"bookmark": "True"})
        else:
            return Response({"bookmark": "False"})
    else:
        return Response({"toggle_user": "Connot found"}) 
    

class UserListView(ListAPIView):
    serializer_class=UserSerializer
    queryset = User.objects.all()

class UserdetailView(RetrieveUpdateAPIView):
    serializer_class=UserSerializer
    queryset = User.objects.all()

class PostBookmarkVew(ListAPIView):
    serializer_class = PostBookmarkSerializer
    def get_queryset(self):
        qs = PostBookmark.objects.filter(user=self.request.user)
        return qs
        
    
class RecomendedUser(ListAPIView):
    serializer_class = PostUserDetailsSerializer
    def get_queryset(self):
        user = self.request.user
        follow_user = UserFollow.objects.get(user=user)
        print(follow_user.following.all())
        qs = User.objects.exclude(id__in= follow_user.following.all()).exclude(username=user.username)
        return  qs 