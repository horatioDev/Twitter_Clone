from django.shortcuts import render

# Import 'generics', 'Item Serializer' and 'Item'
from rest_framework import generics
from apps.items.serializers import ItemSerializer
from .models import Item
from rest_framework.response import Response

# Create your views here.

# Item List w/ generic ListApiView: used for a collection of model instances
# Inherits layout from ItemSerializer

class ItemList(generics.ListAPIView):
    # Instance of info returned filtered from new to old w/ a status of active
    queryset = Item.objects.order_by('created_at').filter(status='active')
    # Serializer class references ItemSerializer
    serializer_class = ItemSerializer

    def get_paginated_response(self, data):
       return Response(data)
