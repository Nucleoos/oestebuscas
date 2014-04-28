from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('oestebuscas.inicial.views',
    url(r'^$','inicial',name='inicial'),
    # Examples:
    # url(r'^$', 'oestebuscas.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    #url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('django.views.static',
    url(r'^static/(?P<path>.*)$', 'serve',
        {'document_root': settings.STATIC_ROOT}),
)