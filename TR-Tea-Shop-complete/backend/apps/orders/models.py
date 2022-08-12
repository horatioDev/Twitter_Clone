from django.db import models

# Import 'Cloudinary'
from cloudinary.models import CloudinaryField

# Import Item for use in Order Item Model
from apps.items.models import Item

# Import User for access in Order Model
from apps.users.models import User

from config.constants import *


# Create your models here.

# Order Model
class Order(models.Model):
    class Meta:
        db_table = 'Order'

    total_price = models.DecimalField('Total Price', max_digits=11, decimal_places=2, blank=False, db_index=True)
    
    full_name = models.CharField('Full Name', max_length=50, blank=False)

    address_line1 = models.CharField('Address Line 1', max_length=25, blank=False)
    
    address_line2 = models.CharField('Address Line 2', max_length=25, blank=False)
    
    city = models.CharField('City', max_length=25, blank=False)
    
    state = models.CharField('State', max_length=25, blank=False)
    
    postal_code = models.IntegerField('Postal Code', blank=False)

    country = models.CharField('Country United States', max_length=25, blank=False, default='United States')

    telephone = models.IntegerField('Telephone', blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    modified_at = models.DateTimeField(auto_now_add=True, blank=True)


# Order Item Model
class OrderItem(models.Model):
    class Meta(object):
        db_table = 'Order Item'
    
    # Issue w/ CASCADE
    order = models.IntegerField('Order', db_index=True, blank=False)
    
    item_id = models.ForeignKey(Item, db_index=True, blank=False, on_delete=models.CASCADE)

    quantity = models.IntegerField('Quantity', blank=False)
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    modified_at = models.DateTimeField(auto_now_add=True, blank=True)

