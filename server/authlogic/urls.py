# myapp/urls.py
from django.urls import path
from .views import UserSignupView, UserLoginView
from rest_framework.decorators import api_view, permission_classes
from django.conf.urls.static import static

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
]
