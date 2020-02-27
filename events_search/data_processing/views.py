from datetime import datetime
import django
from django.db import transaction
from rest_framework import viewsets, permissions
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers
from .utils import get_data_from_file


class SensorsDataViewset(viewsets.ModelViewSet):
    serializer_class = serializers.SensorsDataSerializer
    # permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        time_from = self.request.query_params.get('time_from', datetime(1, 1, 1))
        time_to = self.request.query_params.get('time_to', datetime.now())
        return models.SensorsData.objects.all().filter(well_number=self.kwargs['well_number'])\
            .filter(timestamp__gte=time_from).filter(timestamp__lte=time_to)


class LoadData(APIView):
    def post(self, request):
        file_obj = request.data['file']
        well_number = file_obj.name.split(' ')[-1].split('.')[0]
        timestamps, pressure_before, pressure_after, temperature_before, consumption_before = get_data_from_file(file_obj)
        try:
            with transaction.atomic():
                for t_stamp, v1, v2, v3, v4 in zip(timestamps, pressure_before, pressure_after, temperature_before, consumption_before):
                    data_row = models.SensorsData(well_number=well_number, timestamp=t_stamp, pressure_before=v1,
                                                  pressure_after=v2, temperature_before=v3, consumption_before=v4)
                    data_row.save()
        except django.db.IntegrityError:
            return Response('Integrity error occurred', status=500)

        return Response(status=204)


class DeleteData(APIView):
    def put(self, request):
        point_id = request.data.get('point_id')
        point_type = request.data.get('point_type')
        point_object = get_object_or_404(models.SensorsData, pk=point_id)
        setattr(point_object, point_type, None)
        point_object.save()
        return Response('Resource updated successfully', status=204)
