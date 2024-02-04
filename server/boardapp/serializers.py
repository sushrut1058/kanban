# boardapp/serializers.py
from rest_framework import serializers
from .models import Board

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('board_id', 'user', 'title', 'created_at', 'updated_at', 'tasks', 'descriptions')
