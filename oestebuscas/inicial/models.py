from datetime import datetime
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

class Categorias(MPTTModel):
    class Meta:
        ordering = ('titulo',)

    parent = TreeForeignKey('self', null=True, blank=True, related_name='pai', verbose_name='Categoria Superior')
    titulo = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, blank=True, unique=True)

    def __unicode__(self):
        return self.titulo

class Galeria(models.Model):
    class Meta:
        ordering = ('titulo',)

    titulo = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, blank=True, unique=True)
    palavra_chave = models.CharField(max_length=100, null=True, blank=True,)
    categoria = models.ManyToManyField('Categorias')
    descricao = models.TextField(blank=True, null=True,)
    publicacao = models.DateTimeField(default=datetime.now, blank=True)

    def __unicode__(self):
        return self.titulo

class Imagem(models.Model):
    class Meta:
        ordering = ('galeria','titulo',)

    galeria = models.ForeignKey('Galeria')
    titulo = models.CharField(max_length=100)
    imagem = models.ImageField(
        null=True,
        blank=True,
        upload_to='galeria',
    )


    def __unicode__(self):
        return self.titulo