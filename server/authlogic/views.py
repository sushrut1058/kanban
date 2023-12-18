# # myapp/views.py
import json
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import CustomUser
from .serializers import UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView

class SignUp(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        params = request.data
        print(request.data)
        try:
            user = CustomUser.objects.create_user(Username=params["Username"], Email=params["Email"], password=params["password"], DOB="2000-11-26", Name=params["Name"], Phone=params["Phone"])
            token,stat = Token.objects.get_or_create(user=user)

            return JsonResponse({
                "token":token.key,
                "id": user.id,
                }, status=200)
        except:
            print(2)
            return JsonResponse({"message":"failure"}, status=400)
        # serializer = UserSerializer(data=request.data)
        # print(request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     
        #     #return JsonResponse({'Token': token}, status=200)
        #     return JsonResponse({"message": 1})
        # else:
        #     return JsonResponse(serializer.errors ,status=200)
        
class Login(APIView):
    def post(request):
        if request.method=='POST':
            return JsonResponse("lolwa", status=200)


2