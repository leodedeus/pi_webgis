"""
URL configuration for proj_webgis project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from appwebgis.views import home
from appwebgis.views import adicionar_escola
from appwebgis.views import pesquisar_escola
from appwebgis.views import identificar_feicao
#from appwebgis.views import identificar_escola
#from appwebgis.views import identificar_lote

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('adicionar_escola', adicionar_escola, name='adicionar_escola'),
    path('pesquisar_escola', pesquisar_escola, name='pesquisar_escola'),
    path('identificar_feicao/', identificar_feicao, name='identificar_feicao'),
    #path('identificar_lote/', identificar_lote, name='identificar_lote'),  
]  

