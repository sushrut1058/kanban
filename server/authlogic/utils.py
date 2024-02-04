# your_app_name/utils.py

from authlogic.serializers import UserSerializer

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'User': UserSerializer(user, context={'request': request}).data
    }
