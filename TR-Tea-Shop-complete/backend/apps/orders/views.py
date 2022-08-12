from urllib import response
from django.shortcuts import render

# Import generics
from rest_framework import generics

# Import status
from rest_framework import status

# Import Response
from rest_framework.response import Response

# Import JSONRenderer
from rest_framework.renderers import JSONRenderer

# Import Custom Login Mixin
from apps.users.mixins import CustomLoginRequiredMixin

# Import Order and Order Item
from .models import OrderItem, Order

# Import Order Serializer
from .serializers import OrderSerializer

# Import Order form and Order Item form
from .forms import OrderForm, OrderItemForm

# Import Cart Item
from apps.carts.models import CartItem

from django.core import serializers


# Create your views here.


# Add to Order view
class OrderAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    # Grabs all objects in order
    queryset = Order.objects.all()
    # Set serializer class
    serializer_class = OrderSerializer

    # Define a get method that retrieves what is added to the cart by the order it was added and filtered by active user, and return a list of objects
    def get(self,request, *args, **kwargs):

        # Grabs items created / added by active use
        self.queryset = CartItem.objects.order_by('created_at').filter(user=request.login_user)
        # Return list
        return self.list(request, *args, **kwargs)

    # Define a post method that saves the active user order request to order form, checks if form is valid and saves, also saves items to user cart, updates order then return serialized data
    def post(self, request, *args, **kwargs):

        # Grab active user order request by id and save to order form
        request.data['user'] = request.login_user.id
        order_form = OrderForm(request.data)

        # Check if order form is valid
        if not order_form.is_valid():
            # If not return error message and error page
            response = Response({"Error": "Requested data is not correct"}, status=status.HTTP_404_NOT_FOUND)
            # Convert response to JSON
            response.accepted_renderer = JSONRenderer()
            # Type of media to be rendered / accepted
            response.accepted_media_type = 'application/json'
            # Context rendered will be an object
            response.renderer_context = {}

            # Return info
            return response
        
        # Save user order
        order = order_form.save()

        # Get active user cart items 
        carts = CartItem.objects.filter(user=request.login_user)

        # For each item in cart create instance that holds user's order #, item # and quantity then save
        for cart in carts:
            order_item_form = OrderItemForm({"order": order.id, "item": cart.item.id, "quantity": cart.quantity})

            # Check if form is valid
            # Save order item
            order_item_form.save()
        
        # Delete cart items for active user
        carts.delete()

        # Update serializer by order w/ availability for more than on
        serializer = OrderSerializer([order], many=True)

        # Return active user info
        return Response(serializer.data[0])
        
        

     

