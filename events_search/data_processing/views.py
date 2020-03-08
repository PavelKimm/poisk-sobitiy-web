import mongoengine
from django.db import transaction
from rest_framework import permissions
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from math import isnan

from . import models
from . import serializers
from .utils import *


class SensorsDataList(ListModelMixin, GenericAPIView):
    queryset = models.SensorsData.objects.all()
    serializer_class = serializers.SensorsDataSerializer
    # permission_classes = [permissions.DjangoModelPermissions]

    def get(self, request, oilfield, well_cluster, well_number):
        return self.list(request)

    def filter_queryset(self, queryset):
        time_from = self.request.query_params.get('time_from')
        time_to = self.request.query_params.get('time_to')
        if time_from:
            time_from = get_datetime_obj_from_string(time_from)
        else:
            time_from = datetime(1, 1, 1)

        if time_to:
            time_to = get_datetime_obj_from_string(time_to)
        else:
            time_to = datetime.now()

        return queryset.filter(oilfield=self.kwargs['oilfield'],
                               well_cluster=self.kwargs['well_cluster'],
                               well_number=self.kwargs['well_number'],
                               timestamp__gte=time_from,
                               timestamp__lte=time_to)


class LoadData(GenericAPIView):
    serializer_class = serializers.LoadDataSerializer

    @staticmethod
    def post(request):
        file_obj = request.data['file']
        well_number = ''.join([x for x in file_obj.name.split('.')[0] if x.isdigit()])
        well_cluster = request.data.get('well_cluster')
        oilfield = request.data.get('oilfield')
        timestamps, pressure_before, pressure_after, temperature_before, consumption_before = get_data_from_file(file_obj)

        with transaction.atomic():
            for t_stamp, v1, v2, v3, v4 in zip(timestamps, pressure_before, pressure_after, temperature_before, consumption_before):
                if isnan(v1):
                    v1 = None
                if isnan(v2):
                    v2 = None
                if isnan(v3):
                    v3 = None
                if isnan(v4):
                    v4 = None
                try:
                    data_row = models.SensorsData(oilfield=oilfield, well_cluster=well_cluster, well_number=well_number,
                                                  timestamp=t_stamp, pressure_before=v1, pressure_after=v2,
                                                  temperature_before=v3, consumption_before=v4)
                    data_row.save()
                except mongoengine.errors.NotUniqueError:
                    pass
                except mongoengine.errors.ValidationError as e:
                    return Response(str(e), status=403)
        return Response('The request is complete', status=201)


class DeleteData(GenericAPIView):
    @staticmethod
    def put(request):
        oilfield = request.data.get('oilfield')
        well_cluster = request.data.get('well_cluster')
        well_number = request.data.get('well_number')
        time_from = get_datetime_obj_from_string(request.data.get('time_from'))
        time_to = get_datetime_obj_from_string(request.data.get('time_to'))
        points = models.SensorsData.objects(oilfield=oilfield, well_cluster=well_cluster,
                                            well_number=well_number, timestamp__gte=time_from,
                                            timestamp__lte=time_to)
        for point in points:
            point.pressure_before = None
            point.pressure_after = None
            point.temperature_before = None
            point.consumption_before = None
            point.save()
        return Response('Resource updated successfully', status=201)


class OilfieldList(GenericAPIView):
    queryset = models.SensorsData.objects.distinct('oilfield')

    def get(self, request):
        return Response(self.queryset)


class WellClusterList(GenericAPIView):
    queryset = models.SensorsData.objects

    def get(self, request, oilfield):
        return Response(self.queryset.filter(oilfield=oilfield).distinct('well_cluster'))


class WellNumberList(GenericAPIView):
    queryset = models.SensorsData.objects

    def get(self, request, oilfield, well_cluster):
        return Response(self.queryset.
                        filter(oilfield=oilfield, well_cluster=well_cluster).
                        distinct('well_number'))
