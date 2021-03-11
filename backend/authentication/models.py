from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  



class CustomAccountManager(BaseUserManager):

    def create_superuser(self,email, username, password, **othersField):
        othersField.setdefault('is_superuser', True)
        othersField.setdefault('is_staff', True)
        othersField.setdefault('is_active', True)

        if othersField.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True')
        
        if othersField.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True')
        
        return self.create_user(email, username, password, **othersField)

    def create_user(self, email, username, password, **othersField):
        if not email:
            raise ValueError(_('you must provide an email address'))
        email =  self.normalize_email(email)
        user = self.model(email=email, username=username, **othersField)
        user.set_password(password)
        user.save()
        return user

        

# Custom authentication model
class NewUsers(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), max_length=254, unique=True)
    username = models.CharField(_("username"), max_length=50, unique=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return str(self.username)


# singal for send email with token to reset password
# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

#     email_plaintext_message = "You're receiving this email because you requested a password reset for your user account at U-profile.\n\n Please copy the token value to reset password. \n\n Token = {} \n\n Thanks for using our site! \n\n The U-profile team.".format(reset_password_token.key)

#     print('hello')

#     send_mail(
#     'Subject',
#     'Message.',
#     'U-profile Team',
#     ['kmotiour30@gmail.com'],
#     )


    # send_mail(
    #     # title:
    #     "Password Reset for {title}".format(title="U-profile"),
    #     # message:
    #     email_plaintext_message,
    #     # from:
    #     "U-profile Team",
    #     # to:
    #     [reset_password_token.user.email]
    # )


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )

