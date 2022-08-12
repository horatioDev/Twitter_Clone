# Import Cart and serializers
from .models import CartItem
from rest_framework import serializers

# Create CartItemSerializer
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        # Model reference
        model = CartItem
        # Set to required fields
        fields = '__all__'
        depth = 1





# Create CartItemAddSerializer used to add item to cart
class CartItemAddSerializer(serializers.ModelSerializer):
    class Meta:
        # Model reference
        model = CartItem
        # Set to required fields
        fields = '__all__'