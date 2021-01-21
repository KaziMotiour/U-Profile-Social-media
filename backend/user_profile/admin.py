from django.contrib import admin
from .models import User_profile, UserFollow, PostBookmark
# Register your models here.

admin.site.register(User_profile)
admin.site.register(UserFollow)
admin.site.register(PostBookmark)

