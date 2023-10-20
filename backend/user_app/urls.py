from django.urls import path
from .views import Sign_up, Info, Login, Log_out, Master_sign_up

urlpatterns = [
    path('signup/', Sign_up.as_view()),
    path('login/', Login.as_view()),
    path('logout/', Log_out.as_view()),
    path('info/', Info.as_view()),
    path("master/",Master_sign_up.as_view())
]