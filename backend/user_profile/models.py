from django.db import models
from django.contrib.auth import  get_user_model
User= get_user_model()
from django.db.models.signals import post_save,  post_delete
from django.dispatch import receiver


def upload_to(instance, filename):
    return 'ProfilePic/{filename}'.format(filename=filename)

class User_profile(models.Model):
    user = models.ForeignKey(User, related_name='profile', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    Last_name = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    Phone = models.CharField(max_length=50, null=True, blank=True)
    facebook_Link = models.CharField(max_length=200, null=True, blank=True)
    twitter_link = models.CharField(max_length=200, null=True, blank=True)
    linkdin_link = models.CharField(max_length=200, null=True, blank=True)
    github_link = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to=upload_to, default='ProfilePic/default.jpg')
    
    def __str__(self):
        return str(self.user.username)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        User_profile.objects.create(user=instance.user)




