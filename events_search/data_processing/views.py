from rest_framework import viewsets, permissions
from rest_framework.views import APIView

from . import models
from . import serializers
from django.db import transaction
from .utils import get_data_from_file


class SensorsDataViewset(viewsets.ModelViewSet):
    queryset = models.SensorsData.objects.all()
    serializer_class = serializers.SensorsDataSerializer
    # permission_classes = [permissions.DjangoModelPermissions]


class LoadData(APIView):
    def post(self, file_path):
        columns, timestamps, pressure_before, pressure_after, temperature_before, consumption_before = get_data_from_file(file_path)
        with transaction.atomic():
            for ts, v1, v2, v3, v4 in timestamps, pressure_before, pressure_after, temperature_before, consumption_before:
                well_number = file_path.split(' ')[-1]
                data_row = models.SensorsData(well_number=well_number, timestamp=ts, pressure_before=v1,
                                              pressure_after=v2, temperature_before=v3, consumption_before=v4)
                data_row.save()
