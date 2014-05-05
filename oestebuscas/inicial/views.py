# coding=utf-8
from django.shortcuts import render
from oestebuscas.inicial.models import Galeria,Imagem

def inicial(request):
    context = {'galeria': Galeria.objects.all()[0:10],'imagem': Imagem.objects.all()[0:1]}
    return render(request, 'inicial.html',context)