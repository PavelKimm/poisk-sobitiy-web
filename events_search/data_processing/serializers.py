from rest_framework import serializers
from . import models


class SensorsDataSerializer(serializers.Serializer):
    oilfield = serializers.CharField()
    well_cluster = serializers.IntegerField()
    file = serializers.FileField()

    # well_number = serializers.IntegerField()
    # timestamp = serializers.DateTimeField()
    # pressure_before = serializers.FloatField()
    # pressure_after = serializers.FloatField()
    # temperature_before = serializers.FloatField()
    # consumption_before = serializers.FloatField()
