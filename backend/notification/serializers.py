from rest_framework import serializers
from .models import Notification
from user_profile.serializers import PostUserDetailsSerializer
from UserPost.serializers import PostSerializer
from .models import Notification


class NotifiactionSerializer(serializers.ModelSerializer):
    sender = PostUserDetailsSerializer(read_only=True)
    user = PostUserDetailsSerializer(read_only=True)
    date = serializers.SerializerMethodField(read_only=True)
    post = PostSerializer()
    class Meta:
        model = Notification
        fields = ['post', 'sender', 'user', 'Notification_type', 'text_preview', 'date' ]


    def get_date(self, obj):
        return obj.get_date()

