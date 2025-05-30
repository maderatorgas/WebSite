from rest_framework import serializers
from .models import Books, Genre

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class BooksSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)  # genre буде об'єктом
    genre_id = serializers.PrimaryKeyRelatedField(
        queryset=Genre.objects.all(), source='genre', write_only=True
    )

    class Meta:
        model = Books
        fields = ['id', 'title', 'genre', 'genre_id', 'description', 'price', 'rating', 'image']        