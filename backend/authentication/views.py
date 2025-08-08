from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import authenticate
from backend.settings import SIMPLE_JWT
from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer
from .models import CustomUser


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        print(serializer.is_valid(raise_exception=True))
        
        user = authenticate(
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        
        if not user:
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        response = Response({
            'user': UserSerializer(user).data,
            'accessToken': str(access_token)
        })
        
        # Set httpOnly cookie
        response.set_cookie(
            'refreshToken',
            str(refresh),
            max_age=SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].days*24*60*60,  
            httponly=True,
            secure=True,
            samesite='Strict'
        )
        
        return response

class RefreshTokenView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        
        if not refresh_token:
            return Response(
                {'error': 'Refresh token not found'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = refresh.access_token
            
            return Response({
                'accessToken': str(new_access_token)
            })
            
        except TokenError:
            return Response(
                {'error': 'Invalid refresh token'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                pass
        
        response = Response({'message': 'Successfully logged out'})
        response.delete_cookie('refreshToken', samesite='Strict')
        
        return response