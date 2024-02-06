# boardapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Board
from .serializers import BoardSerializer,BoardListSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

class BoardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, board_id=None, format=None):
        if board_id:
            board = get_object_or_404(Board, board_id=board_id, user=request.user)
        else:
            board = Board.objects.filter(user=request.user)
        serializer = BoardSerializer(board, many=board_id is None)
        return Response(serializer.data)

    def post(self, request, board_id, format=None):
        # Creating a new board
        serializer = BoardSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, board_id, format=None):
        # Updating an existing board
        board = get_object_or_404(Board, board_id=board_id, user=request.user)
        serializer = BoardSerializer(board, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, board_id, format=None):
        board = get_object_or_404(Board, board_id=board_id, user=request.user)
        board.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FetchBoardView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        boards = Board.objects.filter(user=request.user)
        serializer = BoardListSerializer(boards, many=True)
        return Response(serializer.data)