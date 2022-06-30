from django.shortcuts import render

from .models import Post

from .forms import PostForm, EditPostForm

from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.

# Define a 'Post' view:
def index(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        # Check if valid:
        if form.is_valid():
            # Save to database:
            form.save()
            # Redirect to same/current page:
            return HttpResponseRedirect('/')
        else:
            return HttpResponseRedirect(form.errors.as_json())
    # Get all posts; limit: 20
    posts = Post.objects.all()[:20]
    return render(request, 'posts.html', {'posts':posts})

# Define a 'Edit' view:
def edit(request, post_id):
    # Create a instance to hold data:
    post = Post.objects.get(id=post_id)
    # Check if method is 'POST':
    if request.method == 'POST':
        form = EditPostForm(request.POST, request.FILES, instance=post)
        # Check if valid:
        if form.is_valid():
            # Save to database:
            form.save()
            # Redirect to same/current page:
            return HttpResponseRedirect('/')
        else:
            return HttpResponse("Not Valid")
            # return HttpResponseRedirect(form.errors.as_json())
    # Display user edited post
    return render(request, 'edit.html', {'post':post})

# Define 'Like' function
def like(request, post_id):
    # Create a post instance to hold data:
    likes = Post.objects.get(id=post_id)
    # Increment likes:
    likes.like_count += 1
    
    # Save likes:
    likes.save()
    # Redirect to same/current page:
    return HttpResponseRedirect('/')

# Define 'Cancel' function
def cancel(request, post_id):
    # Find user post
    post = Post.objects.get(id = post_id)
    # Delete user post
    post.save()
    return HttpResponseRedirect('index')

# Define 'Delete' function
def delete(request, post_id):
    # Find user post
    post = Post.objects.get(id = post_id)
    # Delete user post
    post.delete()
    return HttpResponseRedirect('/')