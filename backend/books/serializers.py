from rest_framework import serializers
from .models import Books, Genre

class BooksSerializer(serializers.ModelSerializer):
    genre = serializers.CharField(source='genre.name', read_only=True)
    class Meta:
        model = Books
        fields = ['title', 'genre', 'description', 'price', 'rating', 'image']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']