# Import views
from . import views

# Import path
from django.urls import path

urlpatterns = [
    path('', views.CartItemList.as_view(), name='cart_list'),
    path('add/', views.CartItemAdd.as_view(), name='cart_add'),
    path('update/<int:pk>/', views.CartItemUpdate.as_view(), name='update_cart'),
    path('delete/<int:pk>/', views.CartItemDelete.as_view(), name='delete_cart'),
]