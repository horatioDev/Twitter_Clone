from django.shortcuts import render

from .models import Post

from .forms import PostForm, EditPostForm

from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.


def index(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/')
        else:
            return HttpResponseRedirect(form.errors.as_json())

    # Get all posts; limit: 20
    posts = Post.objects.all()[:20]
    return render(request, 'posts.html', {'posts':posts})


def edit(request, post_id):
    if request.method == 'POST':
        form = EditPostForm(request.POST, post_id)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('edit')
        else:
            return HttpResponseRedirect(form.errors.as_json())

    # Get all posts; limit: 20
    post = Post.objects.get(id = post_id)    
    context = {'post':post}
    return render(request, 'edit.html', context)


# Define delete function
def delete(request, post_id):
    # Find user post
    post = Post.objects.get(id = post_id)
    # Delete user post
    post.delete()
    return HttpResponseRedirect('/')