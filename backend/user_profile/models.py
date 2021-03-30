from django.db import models
from django.contrib.auth import  get_user_model
from django.conf import settings
User= get_user_model()
from django.db.models.signals import post_save,  post_delete, m2m_changed
from django.dispatch import receiver
from UserPost.models import UserPost
from notification.models import Notification


def upload_to(instance, filename):
    return 'ProfilePic/{filename}'.format(filename=filename)

def uploadCover_to(instance, filename):
    return 'CoverPic/{filename}'.format(filename=filename)
class User_profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100, null=True, blank=True)
    Last_name = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    occupations  =  models.CharField(max_length=200, null=True, blank=True)
    gander = models.CharField(max_length=200, null=True, blank=True)
    relationship_status = models.CharField(max_length=200, null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    Phone = models.CharField(max_length=50, null=True, blank=True)
    facebook_Link = models.CharField(max_length=200, null=True, blank=True)
    twitter_link = models.CharField(max_length=200, null=True, blank=True)
    linkdin_link = models.CharField(max_length=200, null=True, blank=True)
    github_link = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to=upload_to, default='ProfilePic/default.jpg')
    cover_picture = models.ImageField(upload_to=uploadCover_to, default='CoverPic/meWithNature.jpg')
    
    def __str__(self):
        return str(self.user.username)





class UserFollowManager(models.Manager):

    def ToggleFollow(self, user, toggle_user):
        get_user,created = UserFollow.objects.get_or_create(user=user)
        if toggle_user in get_user.following.all():
            get_user.following.remove(toggle_user)
            added=False
        else:
            get_user.following.add(toggle_user)
            added=True
        return added

class UserFollow(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='follow')
    following = models.ManyToManyField(User, related_name="UserFollowing", blank=True)
    followed_by = models.ManyToManyField(User, related_name='UserFollowed_by',  blank=True)
    
    objects = UserFollowManager()
    
    def __str__(self):
        return str(self.user)




class PostBookmarkManager(models.Manager):
    def TogglePostBookmark(self, user, post):
        get_user,created = PostBookmark.objects.get_or_create(user=user)
        
        if post in get_user.post.all():
            added=False
        else:
            get_user.post.add(post)
            added=True
        return added
class PostBookmark(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookmark')
    post = models.ManyToManyField(UserPost, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = PostBookmarkManager()

    def __str__(self):
        return str(self.user)






     
     
@receiver(post_save, sender=User)
def create_UserFollow(sender, instance, created, **kwargs):
    if created:
        UserFollow.objects.create(user=instance)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        User_profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def create_Relation_With_Bookmrak(sender, instance, created, **kwargs):
    if created:
        PostBookmark.objects.create(user=instance)

@receiver(m2m_changed, sender=UserFollow.following.through)
def Add_Follow_Notification(sender, instance, action, reverse, pk_set, **kwargs):

    
    if action == 'pre_add':
        user = User.objects.get(pk=list(pk_set)[0])
        who_following = User.objects.get(username=instance)
        notify = Notification(sender=who_following, user=user, Notification_type=3)
        notify.save()
    if action == 'pre_remove':
        user = User.objects.get(pk=list(pk_set)[0])
        who_following = User.objects.get(username=instance)
        notify = Notification.objects.filter(sender=who_following, user=user, Notification_type=3).first()
        print(notify,'ggg')
        if notify:
            notify.delete()

