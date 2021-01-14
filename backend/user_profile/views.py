from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view,  permission_classes
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permission import IsOwnerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserProfile
from .models import User_profile
from django.contrib.auth import get_user_model
from .models import UserFollow
User= get_user_model()



class EditUserProfile(RetrieveUpdateAPIView):
    # permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = UserProfile
    queryset = User_profile.objects.all()

    
class get_user(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfile
    queryset = User_profile.objects.all()



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserFollowViews(request, username):
    permission_classes = [IsAuthenticated]
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
    
    