from django.shortcuts import render
from .models import User, Event
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.serializers import serialize
import json 

# Create your views here.
class All_Events(APIView):
    
    def get(self, request):
        all_events = Event.objects.all()
        serialized_event = serialize("json", all_events)
        #print(serialized_event)
        readable_event = json.loads(serialized_event)
        for event in range(len(readable_event)):
          current_event = readable_event[event]
          event_poster = current_event["fields"]["owner"]
          print(event_poster)
          list_of_users = []
          event_poster = User.objects.get(id=event_poster)
          readable_user = json.loads(serialize("json", [event_poster]))
          list_of_users.append(readable_user)
          current_event["fields"]["owner"] = list_of_users
          # for person in event_poster:
          #     author = User.objects.get(id = person)
          #     readable_user = json.loads(serialize("json", [author]))
          #     list_of_users.append(readable_user)
          # current_event["fields"]["owner"] = list_of_users
        return Response(readable_event)
    
class Single_Event(APIView):
   
   def get(self, request, event_date):
      #print(event_date)
      event = Event.objects.get(date = event_date)
      serialized_event = json.loads(serialize("json", [event]))[0]
      print(serialized_event)
      return Response(serialized_event)
 