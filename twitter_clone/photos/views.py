from django.shortcuts import render

from .models import Photo
# Create your views here.
import imp
from multiprocessing import context
from urllib import request
from django.shortcuts import redirect, render

# Create your views here.
from django.shortcuts import render

# Import HttpResponsefrom http
from django.http import HttpResponse, HttpResponseRedirect


# Import 'Photo'
from .models import Photo

from .forms import PhotoForm


from cloudinary.forms import cl_init_js_callbacks

def index(request):
    photos = Photo.objects.all()
    context = {'photos': photos}
    return render(request, 'index.html', context)


def loadPicture(request):
    if request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('index')
    form = PhotoForm()
    context = {'form':form}
    return render(request, 'load.html', context)