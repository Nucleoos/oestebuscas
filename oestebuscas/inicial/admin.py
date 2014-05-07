# coding: utf-8

from django.contrib import admin
from oestebuscas.inicial.models import Galeria,Imagem,Categorias,Noticia
from django_summernote.admin import SummernoteModelAdmin

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('titulo','parent')
    search_fields = ('titulo',)
    prepopulated_fields = {'slug':('titulo',)}

admin.site.register(Categorias,CategoriaAdmin)

class ImagemInline(admin.TabularInline):
    model=Imagem
    extra=10

class GaleriaAdmin(admin.ModelAdmin):
    list_display = ('titulo','publicacao')
    #date_hierarchy = 'publicacao'
    search_fields = ('titulo','categoria','descricao','publicacao')
    list_filter = ['publicacao']
    inlines = [ImagemInline,]
    prepopulated_fields = {'slug':('titulo',)}

admin.site.register(Galeria,GaleriaAdmin)

class NoticiaAdmin(SummernoteModelAdmin):
    list_display = ('titulo','publicacao')
    #date_hierarchy = 'publicacao'
    search_fields = ('titulo','categoria','descricao','publicacao')
    list_filter = ['publicacao']
    prepopulated_fields = {'slug':('titulo',)}

admin.site.register(Noticia,NoticiaAdmin)