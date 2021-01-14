# Generated by Django 3.1.5 on 2021-01-14 15:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFollow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('followed_by', models.ManyToManyField(related_name='followed_by', to='authentication.NewUsers')),
                ('following', models.ManyToManyField(related_name='following', to='authentication.NewUsers')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='Userfollow', to='authentication.newusers')),
            ],
        ),
    ]