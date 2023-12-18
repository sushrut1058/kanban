# myapp/urls.py
from django.urls import path
from .views import SignUp, Login
from rest_framework.decorators import api_view, permission_classes
from django.conf.urls.static import static

urlpatterns = [
    path('signup/', SignUp.as_view(), name='signup'),
    path('login/', Login.as_view(), name='login'),
]
