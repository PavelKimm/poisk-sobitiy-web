from django.contrib.auth.models import AbstractUser
from django.core import validators
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    first_name = models.CharField(
        _('first_name'),
        unique=False,
        max_length=32,
        validators=[validators.RegexValidator(r'[A-Za-z]{1,32}')],
        help_text=_('имя'),
        error_messages={
            'required': _("Please enter your first name"),
        },
    )
    patronymic = models.CharField(
        _('patronymic'),
        null=True,
        unique=False,
        max_length=32,
        validators=[validators.RegexValidator(r'[A-Za-z]{1,32}')],
        help_text=_('отчество'),
    )
    last_name = models.CharField(
        _('last_name'),
        unique=False,
        max_length=32,
        validators=[validators.RegexValidator(r'[A-Za-z]{1,32}')],
        help_text=_('фамилия'),
        error_messages={
            'required': _("Please enter your last name"),
        },
    )
    username = models.CharField(
        _('username'),
        unique=True,
        max_length=64,
        validators=[validators.RegexValidator(r'[A-Za-z]{1,32}')],
        help_text=_('логин'),
        error_messages={
            'unique': _("A user with that username already exists."),
        },
        blank=True,
    )
    password = models.CharField(_('password'), max_length=128, blank=True)
    password_text = models.CharField(_('password_text'), max_length=128, blank=True)

    def __str__(self):
        return self.username

    @property
    def is_admin(self):
        return self.is_staff

    def lock(self):
        self.is_active = False
        self.save()

    def unlock(self):
        self.is_active = True
        self.save()
