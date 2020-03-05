from datetime import datetime
import mongoengine
from django.db import transaction
from rest_framework import viewsets, permissions
from rest_framework.generics import get_object_or_404, GenericAPIView
from rest_framework.response import Response

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


class LoadData(GenericAPIView):
    serializer_class = serializers.SensorsDataSerializer

    @staticmethod
    def post(request):
        file_obj = request.data['file']
        well_number = file_obj.name.split(' ')[-1].split('.')[0]
        well_cluster = request.data.get('well_cluster')
        oilfield = request.data.get('oilfield')
        timestamps, pressure_before, pressure_after, temperature_before, consumption_before = get_data_from_file(file_obj)
        try:
            with transaction.atomic():
                for t_stamp, v1, v2, v3, v4 in zip(timestamps, pressure_before, pressure_after, temperature_before, consumption_before):
                    data_row = models.SensorsData(oilfield=oilfield, well_cluster=well_cluster, well_number=well_number,
                                                  timestamp=t_stamp, pressure_before=v1, pressure_after=v2,
                                                  temperature_before=v3, consumption_before=v4)
                    data_row.save()
        except mongoengine.errors.NotUniqueError:
            return Response('Integrity error occurred', status=500)
        except mongoengine.errors.ValidationError:
            return Response('Some fields have validation errors', status=403)

        return Response(status=204)


class DeleteData(GenericAPIView):
    @staticmethod
    def put(request):
        point_id = request.data.get('point_id')
        point_type = request.data.get('point_type')
        point_object = get_object_or_404(models.SensorsData, pk=point_id)
        setattr(point_object, point_type, None)
        point_object.save()
        return Response('Resource updated successfully', status=204)
