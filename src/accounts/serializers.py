from django.db.transaction import atomic
from rest_framework import serializers

from src.conf import settings
from . import models
from . import utils


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'username',
            'password',
            'password_text',
            'first_name',
            'patronymic',
            'last_name',
            'is_active',
            'email',
            'is_staff'
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        with atomic():
            first_name = validated_data.pop('first_name')
            try:
                patronymic = validated_data.pop('patronymic')
            except KeyError:
                patronymic = None
            last_name = validated_data.pop('last_name')
            email = validated_data.pop('email')
            is_staff = validated_data.pop('is_staff')
            print(is_staff)

            username = utils.generate_username(first_name, patronymic, last_name)
            password = utils.generate_password(settings.DEFAULT_PASSWORD_LENGTH)

            user = models.User.objects.create_user(
                username=username,
                # regular password field gets encrypted
                password=password,
                password_text=password,
                first_name=first_name,
                patronymic=patronymic,
                last_name=last_name,
                email=email,
                is_staff=is_staff,
                **validated_data
            )
        return user

    def update(self, instance, validated_data):
        if validated_data.get('password'):
            password = validated_data.pop('password')
            instance.set_password(password)
        instance = super().update(instance, validated_data)
        return instance
