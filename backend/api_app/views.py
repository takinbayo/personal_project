from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import pprint
# Create your views here.

pp = pprint.PrettyPrinter(indent=2, depth=2)

class Event_Image(APIView):
    
    def get(self, request):
      movie_id = 2
      url = f"https://api.themoviedb.org/3/movie/{movie_id}/images"
      access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjBiZmIxNTgxMmYyYTUxNGZlYmY5OWU2Y2U4ZTVlOSIsInN1YiI6IjY1MmRjOTRmMGNiMzM1MTZmNzQ4OTkzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.71VT_QarprP92KAbU8uQUY7OKseeiuB1mC7WceEsA04'

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