from rest_framework import serializers
from . import models


class SensorsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SensorsData
        fields = ('id', 'well_number', 'timestamp', 'pressure_before',
                  'pressure_after', 'temperature_before', 'consumption_before')
