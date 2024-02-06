# boardapp/serializers.py
from rest_framework import serializers
from .models import Board

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('board_id', 'user', 'title', 'created_at', 'updated_at', 'tasks', 'descriptions')
        read_only_fields = ('board_id', 'user', 'created_at', 'updated_at')  # board_id and user are read-only

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super(BoardSerializer, self).create(validated_data)

class BoardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('board_id', 'title')