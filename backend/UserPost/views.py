from django.shortcuts import render
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer, PostCreateSerializer, SharePostSerializer, PostCommentSerializer, PostUserDetailsSerializers, ProductFilter
from django.shortcuts import get_object_or_404
from .models import UserPost, PostComment
from .permission import IsOwnerOrReadOnly
from user_profile.models import UserFollow
from django_filters import rest_framework as filters
# Create your views here.
class List_of_user(ListAPIView):
    serializer_class=PostSerializer
    queryset = UserPost.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ProductFilter




@api_view(['GET'])
def likedUser(requser, post_id):
    post = UserPost.objects.get(id=post_id)
    print(post.likes.all())
    return Response({'hello'})

# get all the user List from ManyToManyFields
class postLikedUser(ListAPIView):
    serializer_class = PostUserDetailsSerializers
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        post = UserPost.objects.get(pk=pk)
        qs = post.likes.all()
        return qs
    

class PostListView(ListAPIView):
    serializer_class=PostSerializer
    # queryset = UserPost.objects.all()
   
    def get_queryset(self):
        users = self.request.user
        follow_user = UserFollow.objects.get(user=users)
        print(follow_user.following.all())
        qs = UserPost.objects.filter(Q(user__in = follow_user.following.all()) | Q(user=users) | Q(privacy='public')).exclude(privacy='onlyme')
        return  qs 

class PostDetailView(RetrieveUpdateDestroyAPIView): 
    serializer_class=PostSerializer
    queryset = UserPost.objects.all()
    
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



@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def postCommentCreate(request, pk):
    user = request.user
    post = UserPost.objects.filter(pk=pk).first()
    serialized_data = PostCommentSerializer(data=request.data)

    if serialized_data.is_valid():
        comment=serialized_data.data.get('comment')
        createComment=PostComment.objects.create(user=user, post=post, comment=comment)
        createComment.save()
        return Response({'comment':'created'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'comment':'validate error'}, status=status.HTTP_400_BAD_REQUEST)

class PostCommentUpdateAndDelete(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = PostCommentSerializer
    queryset = PostComment.objects.all()
