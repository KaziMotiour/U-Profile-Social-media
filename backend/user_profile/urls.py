from django.urls import path, include
from .views import EditUserProfile

urlpatterns = [

    path('edit-profile/<int:pk>', EditUserProfile.as_view(), name="edit-profile")

]