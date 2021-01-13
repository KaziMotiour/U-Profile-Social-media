from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permission import IsOwnerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserProfile
from .models import User_profile


class EditUserProfile(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = UserProfile
    queryset = User_profile.objects.all()

    
