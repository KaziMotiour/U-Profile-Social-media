from django.urls import path, include
from .views import EditUserProfile, GetLoggedinUser, UserFollowViews,UserdetailView, UserProfileView, ToggleBookmarkViews, PostBookmarkVew, RecomendedUser, MutualFeiend, Following, Follower, SearchUser

urlpatterns = [
    path('<slug:username>', UserProfileView.as_view(), name="user"),
    path('user/<slug:username>/', UserdetailView.as_view(), name="user"),
    path('search/<slug:query>', SearchUser.as_view(), name="search_user"),
    path('loggedinUser/', GetLoggedinUser.as_view(), name="get-user"),
    path('edit-profile/<int:pk>', EditUserProfile.as_view(), name="edit-profile"),
    path('follow/<slug:username>', UserFollowViews, name="userFollow"),
    path('bookmark/', PostBookmarkVew.as_view(), name="PostBookmarkVIew"),
    path('bookmark/<int:pk>', ToggleBookmarkViews, name="postBookmarkViews"),
    path('recomemdedUser/', RecomendedUser.as_view(), name="postBookmarkViews"),
    path('mutualfriend/<int:pk>', MutualFeiend.as_view(), name="postBookmarkViews"),
    path('following/<slug:username>/', Following.as_view(), name="FollowingOrFollower"),
     path('follower/<slug:username>/', Follower.as_view(), name="FollowingOrFollower"),

]