from django.shortcuts import render
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.decorators import api_view,  permission_classes
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permission import IsOwnerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserProfile, UserSerializer, PostBookmarkSerializer, PostBookmarkSerializer,PostUserDetailsSerializer, RecomendedUserList, FollowingOrFollower
from .models import User_profile, PostBookmark, UserFollow
from django.contrib.auth import get_user_model
from UserPost.models import UserPost, Post
User = get_user_model()

# Create your views here.


class UserProfileView(RetrieveAPIView):
    serializer_class=UserSerializer
    queryset = User.objects.all()
    lookup_field = "username"
    
class EditUserProfile(RetrieveUpdateAPIView):
    # permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = UserProfile
    queryset = User_profile.objects.all()


    
class GetLoggedinUser(ListAPIView):

    print('User logggggggggggggggggg')

    permission_classes=[IsAuthenticated]
    
    serializer_class = PostUserDetailsSerializer
    def get_queryset(self):
        user = self.request.user
        print(user.username)
        qs = User.objects.filter(username__icontains=self.request.user.username)
        return qs



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
    



class UserdetailView(RetrieveUpdateAPIView):
    serializer_class=UserSerializer
    queryset = User.objects.all()

class PostBookmarkVew(ListAPIView):
    serializer_class = PostBookmarkSerializer
    def get_queryset(self):
        qs = PostBookmark.objects.filter(user=self.request.user)
        return qs
        
    
class RecomendedUser(ListAPIView):
    serializer_class = RecomendedUserList
    def get_queryset(self):
        user = self.request.user
        follow_user = UserFollow.objects.get(user=user)
        qs = User.objects.exclude(id__in= follow_user.following.all()).exclude(username=user.username).order_by('?')[:5]
        return  qs


class MutualFeiend(ListAPIView):
    serializer_class=PostUserDetailsSerializer
    def get_queryset(self):
        R_user = self.request.user
        RE_user = self.kwargs.get('pk')
        requested_user =UserFollow.objects.filter(user=R_user).first()
        recomended_user = UserFollow.objects.filter(user=RE_user).first()
        return requested_user.following.filter(id__in = recomended_user.following.all())

class Following(ListAPIView):
    serializer_class = PostUserDetailsSerializer
    lookup_field="username"
    def get_queryset(self):
        username = self.kwargs.get('username')
        requested_user =UserFollow.objects.filter(user__username=username).first()
        return requested_user.following.all()


class Follower(ListAPIView):
    serializer_class = PostUserDetailsSerializer
    lookup_field="username"
    def get_queryset(self):
        username = self.kwargs.get('username')
        requested_user =UserFollow.objects.filter(user__username=username).first()
        
        return requested_user.followed_by.all()