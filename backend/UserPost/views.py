from django.shortcuts import render
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer, PostCreateSerializer, SharePostSerializer, PostCommentSerializer, PostUserDetailsSerializers, ProductFilter, PostCommentCreateSerializer
from django.shortcuts import get_object_or_404
from .models import UserPost, PostComment
from .permission import IsOwnerOrReadOnly
from user_profile.models import UserFollow
from django_filters import rest_framework as filters
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your views here.
class List_of_user(ListAPIView):
    serializer_class=PostSerializer
    queryset = UserPost.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ProductFilter

class UserWonPosts(ListAPIView):
    serializer_class=PostSerializer
    # queryset = UserPost.objects.all()
    def get_queryset(self):
        LoggedInUser = self.request.user
        username = self.kwargs.get('username')
        print(username, 'usernameeeeeeeeee')
        if username =='list':
            return UserPost.objects.all()
        
        user = User.objects.get(username=username)
        
        if LoggedInUser.username == username:
            return UserPost.objects.filter(user=user)
        else:
            return UserPost.objects.filter(user=user).exclude(privacy='onlyme')
   



@api_view(['GET'])
def likedUser(requser, post_id):
    post = UserPost.objects.get(id=post_id)
    print(post.likes.all())
    return Response({'hello'})

# get all the user List from ManyToManyFields
class postLikedUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostUserDetailsSerializers
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        post = UserPost.objects.get(pk=pk)
        qs = post.likes.all()
        return qs

class postSharedUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostUserDetailsSerializers
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        post = UserPost.objects.get(pk=pk)
        qs = post.shared_user.all()
        return qs

class PostListView(ListAPIView):
    print('post liststttttt ')
    serializer_class=PostSerializer
    # queryset = UserPost.objects.all()
   
    def get_queryset(self):
        users = self.request.user
        print(users,'post list')
        follow_user = UserFollow.objects.get(user=users)
        print(follow_user.following.all())
        qs = UserPost.objects.filter(Q(user__in = follow_user.following.all()) | Q(user=users) | Q(privacy='public')).exclude(privacy='onlyme')
        return  qs 

class PostDetailView(RetrieveUpdateDestroyAPIView): 
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class=PostSerializer
    queryset = UserPost.objects.all()
    
    
@api_view(['GET','POST'])
# @permission_classes([IsAuthenticated])
def SharePostView(request, post_id):
    
    serilizer_data = SharePostSerializer(data=request.data)
    if serilizer_data.is_valid():
        user_content = serilizer_data.data.get('sharePostContent')
        print(user_content)
        user = request.user
        post = get_object_or_404(UserPost, pk=post_id)
        if post:
            RePost = UserPost.objects.RePost(user, post, user_content)
            
            if RePost:
                post.shared_user.add(user)
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
    serialized_data = PostCommentCreateSerializer(data=request.data)

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
