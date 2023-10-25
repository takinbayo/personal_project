from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import pprint
from dotenv import load_dotenv
import os
import random
# Create your views here.

load_dotenv()
pp = pprint.PrettyPrinter(indent=2, depth=2)

class Event_Image(APIView):
    
    def get(self, request):
      movie_id = random.randint(1, 5)
      url = f"https://api.themoviedb.org/3/movie/{movie_id}/images"
      access_token = os.getenv('API_KEY')

      headers = {
          "accept": "application/json",
          "Authorization": f"Bearer {access_token}"
      }

      response = requests.get(url, headers=headers)
      
      if response.status_code == 200:
         data = response.json()
        #  pp.pprint(data)
         base_url = "https://image.tmdb.org/t/p/w500"
         image_url = data.get('backdrops')[0].get('file_path')
         full_image_url = f"{base_url}{image_url}"
        #  print(image_url)
         return Response({"image_url": full_image_url})
      else:
         return Response({"error": "Failed to fetch data"}, status=response.status_code)