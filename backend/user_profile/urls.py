from django.urls import path, include
from .views import EditUserProfile, GetLoggedinUser, UserFollowViews,UserdetailView, UserListView, ToggleBookmarkViews, PostBookmarkVew, RecomendedUser

urlpatterns = [
    path('user/', UserListView.as_view(), name="user"),
    path('user/<int:pk>', UserdetailView.as_view(), name="user"),
    path('loggedinUser/', GetLoggedinUser.as_view(), name="get-user"),
    path('edit-profile/<int:pk>', EditUserProfile.as_view(), name="edit-profile"),
    path('follow/<slug:username>', UserFollowViews, name="userFollow"),
    path('bookmark/', PostBookmarkVew.as_view(), name="PostBookmarkVIew"),
    path('bookmark/<int:pk>', ToggleBookmarkViews, name="postBookmarkViews"),
    path('recomemdedUser/', RecomendedUser.as_view(), name="postBookmarkViews"),

]