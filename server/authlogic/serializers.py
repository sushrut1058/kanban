# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'Email', 'Username', 'Name', 'Phone', 'DOB', 'password')

    def create(self, validated_data):
        Email = validated_data['Email']
        Name = validated_data['Name']
        Phone = validated_data['Phone']
        password = validated_data['password']
        DOB = "2000-11-26"
        Username = validated_data['Username']

        user = CustomUser.objects.create_user(Username=Username,Name=Name,Email=Email,password=password,DOB=DOB,Phone=Phone)
        return user
