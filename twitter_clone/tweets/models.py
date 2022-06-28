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
    id = models.IntegerField('ID', primary_key=True, blank=False, db_index=True)

    name = models.CharField('Name', max_length=14, blank=False, null=False, db_index=True, default='Anonymous')

    body = models.CharField(
    "Tweet's body", blank=True, max_length=140, db_index=True)

    image = CloudinaryField('image', blank=True, null=False)

    like_count = models.IntegerField('Total number of likes', null=False, blank=False, default=0)

    created_at = models.DateTimeField(blank=False, null=False, default=datetime.now)

    updated_at = models.DateTimeField(blank=False, null=False, default=datetime.now)