from importlib.resources import path
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('edit/', views.edit, name='edit'),
    path('delete/', views.delete, name='delete'),
]