from django.urls import path
from .views import All_Events, Single_Event


#'detty/'
urlpatterns = [
    path('', All_Events.as_view(), name="all_events"),
    path("<str:event_date>/", Single_Event.as_view(), name="single_event"),
]