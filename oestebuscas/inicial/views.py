# coding=utf-8
from django.shortcuts import render

def inicial(request):
    return render(request, 'inicial.html')