# 
from .views import ItemList

from django.urls import path

urlpatterns = [
    path('', ItemList.as_view(), name='item_list'),
]