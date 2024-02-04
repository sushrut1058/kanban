# serializers.py
from rest_framework import serializers
from .models import CustomUser
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'Email', 'Username', 'Name', 'password', 'Phone', 'DOB', 'is_active', 'is_staff',
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
