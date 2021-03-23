from django.urls import path, include
from .views import PostListView, PostDetailView, SharePostView, ToggleLike, PostCreateApiView, postCommentCreate, PostCommentUpdateAndDelete, postLikedUser, List_of_user, postSharedUser,UserWonPosts

urlpatterns = [
    path('create/', PostCreateApiView.as_view(), name="Post_list"),
    path('comment/<int:pk>', postCommentCreate, name='createComment'),
    path('comment/rud/<int:pk>', PostCommentUpdateAndDelete.as_view(), name='RUDComment'),
    path('list/', PostListView.as_view(), name="Post_list"),
    path('<str:username>', UserWonPosts.as_view(), name="UserWonPost"),
    path('detail/<int:pk>', PostDetailView.as_view(), name="Post_list"),
    path('rePost/<int:post_id>', SharePostView, name='RePost'),
    path('like/<int:post_id>', ToggleLike, name='postlike'),
    path('liked-user/<int:pk>', postLikedUser.as_view(), name='likedUser'),
    path('shared-user/<int:pk>', postSharedUser.as_view(), name='sharedUser'),
    path('listofuser/', List_of_user.as_view(), name='listofuser')

]