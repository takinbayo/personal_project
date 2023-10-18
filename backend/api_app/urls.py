from django.urls import path
from .views import Event_Image

urlpatterns = [
    path('', Event_Image.as_view(), name='event_image')
    # '<str:item>/
]