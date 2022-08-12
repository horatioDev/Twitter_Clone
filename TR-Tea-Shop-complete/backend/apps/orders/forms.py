# Import Forms
from django import forms

# Import 'Order' and 'Order Item'
from .models import Order, OrderItem

# Create Order form
class OrderForm(forms.ModelForm):
    class Meta:
        # Model reference
        model = Order
        # Fields required
        fields = '__all__'

# Create Order Item form
class OrderItemForm(forms.ModelForm):
    class Meta:
        # Model reference
        model = OrderItem
        # Fields required
        fields = '__all__'