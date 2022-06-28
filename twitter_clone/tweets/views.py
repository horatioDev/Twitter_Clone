from django.shortcuts import render

from .models import Post

from django.http import HttpResponse
# Create your views here.


def index(request):
    # Get all posts; limit: 20
    posts = Post.objects.all()[:20]
    return render(request, 'posts.html')

def edit(render):
    return HttpResponse('Edit')

def delete(render):
    return HttpResponse('Delete')