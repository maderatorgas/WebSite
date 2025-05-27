from django.db import models


class Genre(models.Model):
    name = models.CharField()


class Books(models.Model):
    title = models.CharField()
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    description = models.TextField()
    price = models.FloatField()
    rating = models.FloatField()
    image = models.ImageField()