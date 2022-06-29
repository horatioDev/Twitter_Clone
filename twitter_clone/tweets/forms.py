# Import forms 
from django import forms

# Import Photo database
from .models import Post


# Create a class PostForm delaring the form
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'


# Create a edit PostForm class
class EditPostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'