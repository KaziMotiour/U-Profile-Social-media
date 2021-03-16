from django.urls import path, include
from .views import NotificationView, countNotification

urlpatterns = [
    path('', NotificationView.as_view(), name='notifiation'),
    path('count/', countNotification.as_view(), name='notifiation')
]