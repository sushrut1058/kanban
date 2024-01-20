# models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import datetime

class CustomUserManager(BaseUserManager):
    def create_user(self, Email, Username, Name, password=None, **extra_fields):
        if not Email:
            raise ValueError('The Email must be set')
        Email = self.normalize_email(Email)
        user = self.model(Email=Email, Username=Username, Name=Name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, Email, Username, Name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(Email, Username, Name, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    Email = models.EmailField(unique=True)
    Username = models.CharField(max_length=150, unique=True)
    Name = models.CharField(max_length=150)
    password = models.CharField(max_length=128)
    Phone = models.CharField(max_length=15, blank=True, null=True)
    DOB = models.DateField(default=datetime.date.today)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['Username', 'Name']

    def __str__(self):
        return self.Email
