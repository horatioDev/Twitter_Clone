from django.shortcuts import render


from django.http import HttpResponse
# Create your views here.


def index(render):
    return HttpResponse('Home')

def edit(render):
    return HttpResponse('Edit')

def delete(render):
    return HttpResponse('Delete')