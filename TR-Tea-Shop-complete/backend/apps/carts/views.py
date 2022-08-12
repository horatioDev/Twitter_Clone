# Import 'generics', 'CartItem', 'CartItemSerializer',  'CartItemAddSerializer', 'Response', 'status'
from rest_framework import generics
from .models import CartItem
from apps.carts.serializers import CartItemSerializer
from apps.carts.serializers import CartItemAddSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer

# Import CustomLoginRequiredMixin
from apps.users.mixins import CustomLoginRequiredMixin
# Create your views here.

# List of items in cart
# ListApiView: used for a collection of model instances
class CartItemList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    # Define get method that retrieves validated user cart items ordered by descending it by when it was created then returning a list of that info
    def get(self, request, *args, **kwargs):

        # Instance of user cart item
        self.queryset =CartItem.objects.order_by('-created_at').filter(user=request.login_user)
        # Return list of user's items
        return self.list(request, *args, **kwargs)
    def get_paginated_response(self, data):
        return Response(data)



# Adds item to cart
# CreateApiView: used for creating endpoints w/ post method handler
class CartItemAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemAddSerializer

    def post(self, request, *args, **kwargs):
        # Set instance to  current logged in user by id
        request.data['user'] = request.login_user.id

        return self.create(request, *args, **kwargs)
    

# Delete item from cart
# DeleteApiView: used for deleting a single model instance w/ delete method
class CartItemDelete(CustomLoginRequiredMixin, generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    # Define delete method w/ instance set to user cart item by pk keyword
    def delete(self, request, *args, **kwargs):

        # User cart item
       item = CartItem.objects.get(pk=self.kwargs['pk'])

       # Check if cart belongs to user trying to 'delete' by id, if not return request error message and response error status 404
       if item.user.id != request.login_user.id:
        response = Response({"Error": "You can not delete this cart-list, you do not have access."}, status=status.HTTP_404_NOT_FOUND)
        
        # 
        response.accepted_accepted_renderer = JSONRenderer()
        response.accepted_media_type = 'application/json'
        response.renderer_context = {}

        # Return response
        return response

       return self.destroy(request, *args, **kwargs)


# Update cart
# UpdateApiView: used for updating a single model instance w/ update method handler
class CartItemUpdate(CustomLoginRequiredMixin, generics.UpdateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    def update(self, request, *args, **kwargs):
        item = CartItem.objects.get(pk=self.kwargs['pk'])

        # Check if cart belongs to user trying to 'update' by id, if not return request error message and response error status 404
        if item.user.id != request.login_user.id:
            response = Response({"Error": "You can not update this cart-list, you do not have access."}, status=status.HTTP_404_NOT_FOUND)
            # 
            response.accepted_render = JSONRenderer()
            response.accepted_media_type = 'application/json'
            response.renderer_context = {}
            return response

        # Update quantity
        item.quantity = request.data['quantity']
        # Save new info
        item.save()
        
        # Update item
        serializer = CartItemSerializer([item], many=True)

        # Return user info
        return Response(serializer.data[0])
    