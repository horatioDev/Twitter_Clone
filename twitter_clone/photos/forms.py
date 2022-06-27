# Import forms 
from urllib import request
from django import forms

# Import Photo database
from .models import Photo


# Create a class PhotoForm delaring the form
class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = '__all__'