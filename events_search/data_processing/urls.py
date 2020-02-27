from . import views as data_views
from django.urls import path


urlpatterns = [
    path('sensors-data/load/', data_views.LoadData.as_view(), name='load-data'),
    path('sensors-data/<int:well_number>/', data_views.SensorsDataViewset.as_view({'get': 'list'}), name='sensors-data-list'),
    path('sensors-data/delete/', data_views.DeleteData.as_view(), name='delete-data'),
]
