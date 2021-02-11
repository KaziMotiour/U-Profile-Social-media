from django.urls import path, include
from .views import PostListView, PostDetailView, ReTweetView, ToggleLike, PostCreateApiView, postCommentCreate, PostCommentUpdateAndDelete, postLikedUser

urlpatterns = [
    path('create/', PostCreateApiView.as_view(), name="Post_list"),
    path('comment/<int:pk>', postCommentCreate, name='createComment'),
    path('comment/rud/<int:pk>', PostCommentUpdateAndDelete.as_view(), name='RUDComment'),
    path('list/', PostListView.as_view(), name="Post_list"),
    path('detail/<int:pk>', PostDetailView.as_view(), name="Post_list"),
    path('rePost/<int:post_id>', ReTweetView, name='RePost'),
    path('like/<int:post_id>', ToggleLike, name='RePost'),
    path('likedUser/<int:pk>', postLikedUser.as_view(), name='RePost')

]