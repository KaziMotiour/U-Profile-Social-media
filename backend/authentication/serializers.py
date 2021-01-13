from rest_framework import serializers
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework.validators import UniqueTogetherValidator
from django.core.validators import validate_email
from .models import NewUsers
from django.contrib.auth import  get_user_model
User= get_user_model()


# Custom authentication serializer model
class singupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=100, required=True)
    class Meta:
        model = User
        fields=['email','username', 'password','password2']
        extra_kwargs = {'password': {'write_only': True}, 'password2':{'write_only': True}}

        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['email', 'username'],
                message = 'email or username should be unique'
            )
        ]

    def validate(self, data):
        email = data['email']
        password1 = data['password']
        password2  = data['password2']

        if len(password1)<=5:
            raise serializers.ValidationError({'password1':'Password must be more then 5 character'})

        if password1 != password2:
            raise serializers.ValidationError({'password2':"password doesn't matched"})
        return data

    def create(self, validated_data):
        user = self.Meta.model(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


