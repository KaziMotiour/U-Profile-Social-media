from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer, PostCreateSerializer, SharePostSerializer
from django.shortcuts import get_object_or_404
from .models import UserPost

# Create your views here.

class PostListView(ListAPIView):
    serializer_class=PostSerializer
    queryset = UserPost.objects.all()

class PostDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class=PostSerializer
    queryset = UserPost.objects.all()
    
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def ReTweetView(request, post_id):
    
    serilizer_data = SharePostSerializer(data=request.data)
    if serilizer_data.is_valid():
        print(serilizer_data.data.get('sharePostContent'))
       
    user_content = serilizer_data.data.get('sharePostContent')
    user = request.user
    post = get_object_or_404(UserPost, pk=post_id)
    if post:
        RePost = UserPost.objects.RePost(user, post, user_content)
        if RePost:
             return Response({"RePost": "True"})
        else:
            return Response({"RePost": "False"})
    else:
        return Response({"post": "Dosn't exist"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ToggleLike(request, post_id):
    user = request.user
    post = get_object_or_404(UserPost, pk=post_id)
    if post:
        RePost = UserPost.objects.toggleLike(user, post)
        if RePost:
             return Response({"RePost": "Liked"})
        else:
            return Response({"RePost": "remove liked"})
    else:
        return Response({"post": "Dosn't exist"})

class PostCreateApiView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class=PostCreateSerializer
    queryset = UserPost.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)