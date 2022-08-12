from django.db import models


from config.constants import *

# Import 'Cloudinary'
from cloudinary.models import CloudinaryField


# Create your models here.
# Item Model
class Item(models.Model):
    class Meta(object):
        db_table = 'Item'

    status = models.CharField('status', choices=STATUS, max_length=50, blank=False, db_index=True, default='inactive')

    name = models.CharField('Name', max_length=120, blank=False, db_index=True, default='inactive')

    price = models.IntegerField(blank=False, db_index=True)

    image = CloudinaryField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    # Return name in string format
    def __str__(self):
        return self.name