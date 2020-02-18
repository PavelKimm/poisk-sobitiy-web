from rest_framework import routers
from . import views as data_views
from django.urls import path


# router = routers.DefaultRouter()
# router.register(r'sensors-data', data_views.SensorsDataViewset)


urlpatterns = [
    path('sensors-data/', data_views.SensorsDataViewset.as_view({'get': 'list'}), name='sensors-data-list'),
    path('sensors-data/load/', data_views.LoadData.as_view(), name='load-data'),
]
