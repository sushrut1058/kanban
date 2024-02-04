# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


class UserSignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        print(request.data)
        user_serializer = UserSerializer(data=request.data)
        print("checking is valid", user_serializer)
        if user_serializer.is_valid():
            print("is valid!")
            user = user_serializer.save()
            # return Response(user_serializer.data, status=201)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh':str(refresh),
                'access':str(refresh.access_token),
                'user':user_serializer.data
            }, status=200)
        print(user_serializer.errors)
        return Response(user_serializer.errors, status=400)

class UserLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        Email = request.data.get('Email')
        password = request.data.get('password')
        print(Email, password)
        user = authenticate(username=Email, password=password) # security measures
        if user is not None and user.is_active:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=200)
            # token_serializer = UserSerializer(user)
            # return Response(token_serializer.data, status=200)
        return Response({"msg": "Invalid credentials"}, status=403)

class TokenVerificationView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        user_serializer = UserSerializer(request.user)
        
        return Response(user_serializer.data)
