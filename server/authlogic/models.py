from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, Email, Username, Name, password=None, Phone=None, DOB=None, **extra_fields):
        if not Email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(Email)
        user = self.model(Email=Email, Username=Username, Name=Name, Phone=Phone, DOB=DOB, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, Email, Username, Name, password=None, Phone=None, DOB=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(Email, Username, Name, password, Phone, DOB, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    Email = models.EmailField(unique=True)
    Username = models.CharField(max_length=30, unique=True)
    Name = models.CharField(max_length=255)
    password = models.CharField(max_length=128)
    Phone = models.CharField(max_length=15, blank=True, null=True)
    DOB = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['Username', 'Name','DOB','Phone']

    def __str__(self):
        return self.email
