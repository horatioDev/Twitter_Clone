from django.shortcuts import render

# Import generics
from rest_framework import generics

# Import 'Serializers'
from .serializers import UserSerializer, UserSignUpSerializer, UserSignInSerializer

# Import 'User'
from .models import User

# Import Custom Login
from .mixins import CustomLoginRequiredMixin

# Import 'Response'
from rest_framework.response import Response

# Create your views here.

# ListApiView: used for a collection of model instances
# List of users: login required, add CustomLoginRequiredMixin

# WHY DOES USER LIST REQUIRE LOGIN ???
class UserList(CustomLoginRequiredMixin, generics.ListAPIView):
    # Collect up to 20 users
    queryset = User.objects.all()[:20]
    # Serializer reference
    serializer_class = UserSerializer


# CreateApiView: used for creating endpoints w/ post method handler
# User Sign Up view
class UserSignUp(generics.CreateAPIView):
    # Collect users
    queryset = User.objects.all()
    # Serializer reference
    serializer_class = UserSignUpSerializer

# User Sign In view
class UserSignIn(generics.CreateAPIView):
    # Collect users
    queryset = User.objects.all()
    # Serializer reference
    serializer_class = UserSignInSerializer


# RetrieveAPIView: used for reading endpoints that represents a single model instance w/ get method handler 
# Check User Login
class UserCheckLogin(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    # Define get method that return login user data serialized
    def get(self, request, *args, **kwargs):

        # Set serializer to UserSerializer w/ login user as an arguments w/ availability for more than one
        serializer = UserSerializer([request.login_user], many=True)

        # Return serialized data Response for current user
        return Response(serializer.data[0])