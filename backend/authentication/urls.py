from django.urls import path
from .views import RegisterView, RefreshTokenView, LogoutView, LoginView, NewsletterSubscribe

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', RefreshTokenView.as_view(), name='refresh_token'),
    path('newsletter_subscribe/', NewsletterSubscribe.as_view(), name='subscribe')

]