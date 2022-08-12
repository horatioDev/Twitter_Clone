# Import 'Order' model and 'serializers'
from rest_framework import serializers
from .models import  Order

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'