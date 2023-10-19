from django.shortcuts import render
from .models import User, Event
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.serializers import serialize
import json 
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from django.core.exceptions import ObjectDoesNotExist

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
  
  def post(self, request):
    event_name = request.data.get("event_name")
    event_des = request.data.get("event_des")
    location = request.data.get("location")
    date = request.data.get("date")
    time = request.data.get("time")
    owner = User.objects.get(id=1)
    new_event = Event(owner = owner, event_name = event_name, event_des = event_des, location = location, date = date, time = time)
    new_event.full_clean()
    new_event.save()
    readable_event = json.loads(serialize("json", [new_event]))
    return Response(readable_event)
    
    

class Single_Event(APIView):
   
  def get(self, request, event_date):
    #print(event_date)
    event = Event.objects.get(date = event_date)
    serialized_event = json.loads(serialize("json", [event]))[0]
    # print(serialized_event)
    return Response(serialized_event)
  
  def put(self, request, event_date):
    print(request.data)
    event_name = request.data.get("event_name")
    event_des = request.data.get("event_des")
    location = request.data.get("location")
    date = request.data.get("date")
    time = request.data.get("time")

    print(event_name)
    event = None
    event = Event.objects.get(date = event_date)
    if location:
       event.location = location
       event.save()
    if event_name:
       event.event_name = event_name
       event.save()
    if event_des:
       event.event_des = event_des
       event.save()
    if date:
       event.date = date
       event.save()
    if time:
       event.time = time
       event.save()
    
    serialized_event = json.loads(serialize("json", [event]))[0]
    # print(serialized_event)
    return Response(serialized_event)
  
  def delete(self, request, event_date):
    try:
      event = Event.objects.get(date = event_date)
      serialized_event = json.loads(serialize("json", [event]))[0]
      print(serialized_event)
      event.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist:
      return Response({"error": "Event not found"}, status=HTTP_404_NOT_FOUND)



