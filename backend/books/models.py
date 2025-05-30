from django.db import models
import uuid


class Genre(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    

class Books(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=400, blank=False)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, blank=False)
    description = models.TextField(blank=False)
    price = models.FloatField(blank=False)
    rating = models.FloatField(blank=False)
    image = models.ImageField(upload_to='book_images/', blank=False) #завантаження файлів в папку