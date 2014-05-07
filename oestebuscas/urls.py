from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('oestebuscas.inicial.views',
    url(r'^$','inicial',name='inicial'),
    url(r'^galeria/(?P<slug>[\w-]+)$','galeria',name='galeria'),
    url(r'^admin/', include(admin.site.urls)),
    # Examples:
    # url(r'^$', 'oestebuscas.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
)

urlpatterns += patterns('django.views.static',
    url(r'^static/(?P<path>.*)$', 'serve',
        {'document_root': settings.STATIC_ROOT}),
)

# Trecho utilizado para que o django sirva os arquivos do summernote
if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))