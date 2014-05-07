# coding=utf-8
from django.shortcuts import render
from oestebuscas.inicial.models import Galeria,Imagem

def inicial(request):
    context = dict(fotos=Imagem.objects.all().order_by('galeria__id', 'galeria__publicacao').distinct('galeria__id')[0:10])
    return render(request, 'inicial.html',context)

def galeria(request,slug):
    context = dict(galeria=Galeria.objects.get(slug=slug),imagens=Imagem.objects.filter(galeria__slug=slug))
    return render(request, 'galeria.html',context)