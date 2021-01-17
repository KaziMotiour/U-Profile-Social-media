from django.urls import path, include
from .views import PostListView, PostDetailView, ReTweetView, ToggleLike, PostCreateApiView

urlpatterns = [
    path('create/', PostCreateApiView.as_view(), name="Post_list"),
    path('list/', PostListView.as_view(), name="Post_list"),
    path('detail/<int:pk>', PostDetailView.as_view(), name="Post_list"),
    path('rePost/<int:post_id>', ReTweetView, name='RePost'),
    path('like/<int:post_id>', ToggleLike, name='RePost')

]