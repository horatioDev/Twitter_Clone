from django.db import models

# Import 'CLoudinary'
from cloudinary.models import CloudinaryField


# Create your models here.

# User Model
class User(models.Model):
    class Meta(object):
        db_table = 'User'

    username = models.CharField('Username', max_length=50, blank=False, db_index=True)

    password = models.CharField('Password', max_length=500, blank=False, db_index=True, default='inactive')

    email = models.EmailField('Email', max_length=254, blank=False, db_index=True)

    token = models.CharField('Token', max_length=500)
    
    token_expires_at = models.DateTimeField('Token Expires At', blank=True, null=True,)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    # Return name in string format
    def __str__(self):
        return self.username