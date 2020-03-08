from . import views as data_views
from django.urls import path


urlpatterns = [
    path('sensors-data/load/', data_views.LoadData.as_view(), name='load-data'),

    path('sensors-data/oilfields/', data_views.OilfieldList.as_view(), name='oilfields-list'),
    path('sensors-data/oilfields/<str:oilfield>/well-clusters/',
         data_views.WellClusterList.as_view(), name='well-clusters-list'),
    path('sensors-data/oilfields/<str:oilfield>/well-clusters/<int:well_cluster>/well-numbers/',
         data_views.WellNumberList.as_view(), name='well-numbers-list'),
    path('sensors-data/oilfields/<str:oilfield>/well-clusters/<int:well_cluster>/well-numbers/'
         '<int:well_number>/', data_views.SensorsDataList.as_view(), name='sensors-data'),

    path('sensors-data/delete/', data_views.DeleteData.as_view(), name='delete-data'),
]
