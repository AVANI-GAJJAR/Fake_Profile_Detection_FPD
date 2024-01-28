from django.shortcuts import render
from django.urls import reverse
from django.template import loader
from django.http import HttpResponse,HttpResponseRedirect
# Create your views here.
def index(request):
    return render(request,'login.html')
def dashboard(request):
    return render(request,'dash_board.html')