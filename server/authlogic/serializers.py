# serializers.py
from rest_framework import serializers
from .models import CustomUser
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            'Email', 'Username', 'Name', 'password', 'Phone', 'DOB', 'is_active', 'is_staff', 'token',
        )
        extra_kwargs = {'password': {'write_only': True}}

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
