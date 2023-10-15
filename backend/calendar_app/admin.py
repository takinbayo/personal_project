from django.contrib import admin
from .models import User, Event

# Register your models here.
admin.site.register([User, Event])
