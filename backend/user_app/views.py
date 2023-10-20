from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Client
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

# Create your views here.

class Sign_up(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = email
        new_client = Client.objects.create_user(username = username, email = email, password = password)
        token = Token.objects.create(user = new_client)
        return Response({"client": new_client.email, "token": token.key}, status=HTTP_201_CREATED)
    
class Master_sign_up(APIView):
    def post(self, request):
        request.data['username'] = request.data.get('email')
        new_client = Client.objects.create_user(**request.data)
        new_client.is_staff = True
        new_client.is_superuser = True
        new_client.save()
        token = Token.objects.create(user = new_client)
        return Response({"client": new_client.email, "token": token.key}, status=HTTP_201_CREATED)
    
class Login(APIView):
   
   def post(self, request):
      username = request.data.get("email")
      password = request.data.get("password")
      user = authenticate(username = username, password = password)
      if user:
         token, created = Token.objects.get_or_create(user = user)
         return Response(token.key)
      return Response("INVALID CREDENTIALS", status=HTTP_404_NOT_FOUND)


class Log_out(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request):
      request.user.auth_token.delete()
      return Response(status=HTTP_204_NO_CONTENT)

class Info(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get(self, request):
    #  print(request.user)
     return Response(request.user.email)
  
