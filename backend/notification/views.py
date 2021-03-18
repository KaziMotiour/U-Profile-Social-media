from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from .serializers import NotifiactionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Notification
# Create your views here.

class NotificationView(ListAPIView):
    serializer_class = NotifiactionSerializer

    def get_queryset(self):
        user = self.request.user
        qs =  Notification.objects.filter(user__id=user.id).order_by('-date')
        qs.update(is_seen=True)
        return qs


class countNotification(APIView):

    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        notification = Notification.objects.filter(user__id=request.user.id, is_seen=False).count()
        content = {'new_notification': notification}
        return Response(content)