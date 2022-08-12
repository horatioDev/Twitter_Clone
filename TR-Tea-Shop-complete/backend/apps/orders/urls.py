# Import path and views
from django.urls import path
from . import views

# Set path
urlpatterns = [
    path('add/', views.OrderAdd.as_view(), name='order_add')
]