# Import 'serializers'
from rest_framework import serializers

# Import 'User'
from apps.users.models import User

# Import 'make_password' built-in func for password encryption
from django.contrib.auth.hashers import make_password, check_password

# Import 'token_hex' built-in func for random API token to be generated in a hexadecimal format
from secrets import token_hex

# Import 'datetime to set/manipulate time/days for expiration of token
import datetime

# User Serializer 
class UserSerializer(serializers.ModelSerializer):
    # Create a var for password for privacy
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        # Selected field
        fields = ('username', 'password', 'token', 'token_expires_at')


# User Sign Up Serializer
class UserSignUpSerializer(serializers.ModelSerializer):
    # Create instances to be serialized and represented in JSON format

    # Create a var for password for privacy validation flag 
    password = serializers.CharField(write_only=True)
    # Set token w/ access to read validation flag 
    token = serializers.CharField(read_only=True)
    # Set token expiration w/ access to read validation flag
    token_expires_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        # Selected fields required for serializer
        fields = (
            'username', 'email', 
            'password', 'token', 
            'token_expires_at'
        )

    # Define a create method and override to handle multiple objects / instances validation
    def create(self, validated_data):

        # Create instance for ['password'] validated data to be encrypted using built-in function 'make_password'
        validated_data['password'] = make_password(validated_data['password'])

        # Create instance for a random ['token'] validated data to generate a hexadecimal string using built-in function 'token_hex'
        validated_data['token'] = token_hex(16)

        # Set an expiration for token using datetitme and timedelta object to set / represent duration
        validated_data['token_expires_at'] = datetime.datetime.now() + datetime.timedelta(days=10)

        return super().create(validated_data)


# User Sign In Serializer
class UserSignInSerializer(serializers.ModelSerializer):
    # Create instances to be serialized and represented in JSON format

    username = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)
    token_expires_at = serializers.DateTimeField(read_only=True)

    class Meta:
        # Model reference
        model = User
        # Selected fields required for serializer
        fields = (
            'username', 'email', 
            'password', 'token', 
            'token_expires_at'
        )

    # Define a create method and override to handle user validation by email
    def create(self, validated_data):
        user = User.objects.filter(email=validated_data['email'])

        # Check if there is a user and if password is the same as encrypted password using built-in func 'check_password'
        if len(user) > 0 and check_password(validated_data['password'], user[0].password):

            # Assign token to user
            user[0].token = token_hex(16)

            # Set token expiration
            user[0].token_expires_at = datetime.datetime.now() + datetime.timedelta(days=10)

            # Save user info
            user[0].save()

            # Return user info
            return user[0]

        # Return validation error if email / password does not match saved data
        else:
            # Raise error message using serializers Validation error
            raise serializers.ValidationError({
                "Error": "The password or email is incorrect."
            })