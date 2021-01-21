from django.db import models
from django.db.models.signals import post_delete, post_save,  m2m_changed
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model 
from django.utils import timezone
from django.conf import settings
from notification.models import Notification
from django.dispatch import receiver

UserModel = get_user_model()

User = settings.AUTH_USER_MODEL


def upload_to(instance, filename):
    return 'User_post/{filename}'.format(filename=filename)


class PostManager(models.Manager):
    def RePost(self,user, post, user_content=''):
     

        if post.parent:
            og_parent = post.parent
        else:
            og_parent = post

        qs = self.get_queryset().filter(user=user, parent=og_parent).filter(
            timestamp__year = timezone.now().year,
            timestamp__month = timezone.now().month,
            timestamp__day=timezone.now().day,
        )
        if qs.exists():
            return None

        
        obj = self.model(
            parent = og_parent,
            user = user,
            content = user_content,
        )
        obj.save()
        return user

    def toggleLike(self, user, post):
        if user in post.likes.all():
            post.likes.remove(user)
            is_likes=False
        else:
            post.likes.add(user)
            is_likes=True

        return is_likes


class Post(models.Model):
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, related_name="post", on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(_("Image field"), upload_to=upload_to)
    likes = models.ManyToManyField(User, blank=True, related_name='post_likes')
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = PostManager()
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.content[0:10]
    

    @property
    def is_retweet(self):
        return self.parent != None





class UserPostManager(models.Manager):
    
    def RePost(self,user, post, user_content=''):
        print('hello', 'model')
     
        if post.parent:
            og_parent = post.parent
        else:
            og_parent = post

        qs = self.get_queryset().filter(user=user, parent=og_parent).filter(
            timestamp__year = timezone.now().year,
            timestamp__month = timezone.now().month,
            timestamp__day=timezone.now().day,
        )
        if qs.exists():
            return None

        
        obj = self.model(
            parent = og_parent,
            user = user,
            content = user_content,
        )
        obj.save()
        return user

    def toggleLike(self, user, post):
        if user in post.likes.all():
            post.likes.remove(user)
            is_likes=False
        else:
            post.likes.add(user)
            is_likes=True

        return is_likes


class UserPost(models.Model):
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, related_name="posts", on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to=upload_to, blank=True)
    likes = models.ManyToManyField(User, blank=True, related_name='post_like')
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = UserPostManager()
    class Meta:
        ordering = ['-id']
    
    def __str__(self):
        return str(self.id)
    

    @property
    def is_retweet(self):
        return self.parent != None
       

class PostComment(models.Model):
    user = models.ForeignKey(User, related_name='userComment', on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey(UserPost, related_name='postComment', on_delete=models.CASCADE, null=True, blank=True)
    comment = models.CharField(max_length=500)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.comment)




@receiver([post_save, post_delete], sender=PostComment)
def create_UserFollow(sender, instance, created=None, **kwargs):
    print(created)
    if created:
        comment = instance
        user = comment.post.user
        sender = comment.user
        post = comment.post
        notify = Notification(post=post, sender=sender, user=user, Notification_type=2, text_preview=comment.comment[:25])
        notify.save()
    elif created == None:
        comment = instance
        user = comment.post.user
        sender = comment.user
        post = comment.post
        notify = Notification.objects.filter(post=post, sender=sender, user=user, Notification_type=2, text_preview=comment.comment[:25]).first()
        notify.delete()

@receiver(m2m_changed, sender=UserPost.likes.through)
def add_like_notification(sender, instance, action,pk_set, **kwargs):
    post = UserPost.objects.get(pk=str(instance))
    sender = UserModel.objects.get(id=list(pk_set)[-1])
    if action == 'pre_add':
        notify = Notification(post = post, sender = sender, user=post.user, Notification_type=1, text_preview=post.content[0:25])
        notify.save()
    elif action == 'pre_remove':
        notify = Notification.objects.filter(post = post, sender= sender, user=post.user, Notification_type=1, text_preview=post.content[0:25]).first()
        notify.delete()
