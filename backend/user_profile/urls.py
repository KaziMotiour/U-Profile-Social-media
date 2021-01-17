from django.urls import path, include
from .views import EditUserProfile, get_user, UserFollowViews,UserdetailView, UserListView

urlpatterns = [
    path('user/', UserListView.as_view(), name="user"),
    path('user/<int:pk>', UserdetailView.as_view(), name="user"),
    path('user-list/', get_user.as_view(), name="get-user"),
    path('edit-profile/<int:pk>', EditUserProfile.as_view(), name="edit-profile"),
    path('follow/<slug:username>', UserFollowViews, name="userFollow")

]