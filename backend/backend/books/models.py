from django.db import models
from backend.settings import STATIC_URL

# Create your models here.
class Books(models.Model):
    title = models.CharField()
    author = models.CharField()
    genre = models.CharField()
    date_of_birth = models.DateField()
    description = models.TextField()
    price = models.FloatField()
    rating = models.FloatField()
    image = models.ImageField()
    