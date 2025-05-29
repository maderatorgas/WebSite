from rest_framework import serializers
from .models import Books, Genre

class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ['title', 'genre', 'description', 'price', 'rating', 'image']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']