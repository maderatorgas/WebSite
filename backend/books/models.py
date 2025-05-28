from django.db import models
import uuid


class Genre(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField()
    

class Books(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(blank=False)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, blank=False)
    description = models.TextField(blank=False)
    price = models.FloatField(blank=False)
    rating = models.FloatField(blank=False)
    image = models.ImageField(blank=False)