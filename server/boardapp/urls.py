# boardapp/urls.py
from django.urls import path
from .views import BoardView

urlpatterns = [
    path('boards/<int:board_id>/', BoardView.as_view(), name='board_operations'),
    # You can add more URLs for other operations if needed
]
