# boardapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Board
from .serializers import BoardSerializer
from rest_framework.permissions import IsAuthenticated

class BoardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, board_id, format=None):
        board = Board.objects.get(board_id=board_id)
        serializer = BoardSerializer(board)
        return Response(serializer.data)

    def post(self, request, board_id, format=None):
        board = Board.objects.get(board_id=board_id)
        serializer = BoardSerializer(board, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, board_id, format=None):
        board = Board.objects.get(board_id=board_id)
        board.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
