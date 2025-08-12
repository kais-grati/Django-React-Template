from rest_framework import serializers
from .models import CustomUser, NewsletterSubscriber

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", "password", "first_name", "last_name", "receive_emails"]
        extra_kwargs = {
            "password": {
                "write_only": True,
                "min_length": 8,
                "style": {"input_type": "password"}
            },
            "first_name": {"required": True},
            "last_name": {"required": True},
        }
    
    def validate_password(self, value):
        """Basic password validation"""
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return value
   
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    """Serializer for returning user data (no sensitive fields)"""
    
    class Meta:
        model = CustomUser
        fields = [
            'id', 
            'email', 
            'first_name', 
            'last_name', 
            'date_joined',
            'receive_emails'
        ]
        read_only_fields = ['id', 'date_joined']

class NewsletterSubscriberSerializer(serializers.ModelSerializer):
        class Meta:
            model = NewsletterSubscriber
            fields = [
                'id', 
                'email'
            ]
