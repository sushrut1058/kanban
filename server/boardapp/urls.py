# boardapp/urls.py
from django.urls import path
from .views import BoardView, FetchBoardView

urlpatterns = [
    path('boards/<int:board_id>/', BoardView.as_view(), name='board_operations'),
    path('fetch/', FetchBoardView.as_view(), name='fetch_boards'),

    # You can add more URLs for other operations if needed
]
