from django.db import models


class Genre(models.Model):
    name = models.CharField()


class Books(models.Model):
    title = models.CharField(blank=False)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE, blank=False)
    date_of_birth = models.DateField(blank=False)
    description = models.TextField(blank=False)
    price = models.FloatField(blank=False)
    rating = models.FloatField(blank=False)
    image = models.ImageField(blank=False)