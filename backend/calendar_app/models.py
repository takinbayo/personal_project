from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    user_email = models.EmailField(unique=True)
    
    def __str__(self):
        return self.first_name

class Event(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=200)
    event_des = models.TextField()
    location = models.TextField()
    date = models.DateField(default="2023-12-25")
    time = models.TimeField(default="23:00")

    def __str__(self):
        return self.event_name
