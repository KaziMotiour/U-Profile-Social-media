
from django.urls import path, include
from .views import CreateNewUserView, ChangePasswordView

urlpatterns = [
    path('singup/', CreateNewUserView.as_view(), name='singup'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('password_reset/confirm/', include('django_rest_passwordreset.urls', namespace='password_reset_confirm')),

]