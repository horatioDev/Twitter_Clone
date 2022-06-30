from time import timezone
from django.db import models
from datetime import datetime

from cloudinary.models import CloudinaryField
# Create your models here.


# Post class/model for database:
class Post(models.Model):
    class Meta(object):
        # Table that info will be in:
        db_table = 'Tweet'
    # Create fields seen in database:
    name = models.CharField('Name', max_length=14, blank=False, null=False, db_index=True, default='Anonymous')

    body = models.CharField(
    "Tweet's body", blank=True, max_length=140, db_index=True)

    image = CloudinaryField('image', blank=True)

    like_count = models.IntegerField('Total number of likes', null=True, blank=True, default=0)

    created_at = models.DateTimeField(blank=True, auto_now_add=True)

    updated_at = models.DateTimeField(blank=True, auto_now_add=True)