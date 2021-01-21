from django.db import models
from django.contrib.auth import  get_user_model
from django.db.models.signals import post_save,  post_delete, pre_delete

User = get_user_model()

# Create your models here.
class Notification(models.Model):
    
    NOTIFICATION_TYPE=  ((1, 'like'), (2, 'comment'), (3, 'follow'))

    post  = models.ForeignKey('UserPost.UserPost', on_delete=models.CASCADE,  related_name='postNotification', blank=True, null=True)
    sender = models.ForeignKey(User,on_delete=models.CASCADE,  related_name='notif_from_user')    
    user =models.ForeignKey(User,on_delete=models.CASCADE,  related_name='notif_to_user')
    Notification_type=models.IntegerField(choices=NOTIFICATION_TYPE)
    text_preview = models.CharField(max_length=90, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)

    def __str__(self):
        return str(self.Notification_type)
     







