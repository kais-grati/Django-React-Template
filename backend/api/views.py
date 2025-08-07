from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import RegistrationSerializer

class Register(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

