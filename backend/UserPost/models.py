from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.conf import settings
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
        return str(self.content)
    

    @property
    def is_retweet(self):
        return self.parent != None
       