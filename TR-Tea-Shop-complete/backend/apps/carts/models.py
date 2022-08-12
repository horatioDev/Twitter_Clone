from django.db import models

# Import 'CLoudinary'
from cloudinary.models import CloudinaryField

# Import Order and Item for use in Order Item Model
from apps.users.models import User
from apps.orders.models import Order
from apps.items.models import Item

# Create your models here.

# Cart Item
class CartItem(models.Model):
    class Meta(object):
        db_table = 'Cart'
        
    user = models.ForeignKey(User, db_index=True, blank=False, on_delete=models.CASCADE)
    
    item = models.ForeignKey(Item, db_index=True, blank=False, on_delete=models.CASCADE)

    quantity = models.IntegerField('Quantity', blank=False)
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    modified_at = models.DateTimeField(auto_now_add=True, blank=True)

   