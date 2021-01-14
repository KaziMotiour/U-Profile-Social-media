from django.urls import path, include
from .views import EditUserProfile, get_user, UserFollowViews

urlpatterns = [
    path('user-list/', get_user.as_view(), name="get-user"),
    path('edit-profile/<int:pk>', EditUserProfile.as_view(), name="edit-profile"),
    path('follow/<slug:username>', UserFollowViews, name="userFollow")

]