from rest_framework import serializers


class SensorsDataSerializer(serializers.Serializer):
    MAX_DIGITS = 15
    DECIMAL_PLACES = 4

    id = serializers.CharField()
    oilfield = serializers.CharField()
    well_cluster = serializers.IntegerField()
    well_number = serializers.IntegerField()
    timestamp = serializers.DateTimeField()
    pressure_before = serializers.DecimalField(MAX_DIGITS, DECIMAL_PLACES)
    pressure_after = serializers.DecimalField(MAX_DIGITS, DECIMAL_PLACES)
    temperature_before = serializers.DecimalField(MAX_DIGITS, DECIMAL_PLACES)
    consumption_before = serializers.DecimalField(MAX_DIGITS, DECIMAL_PLACES)


class LoadDataSerializer(serializers.Serializer):
    oilfield = serializers.CharField()
    well_cluster = serializers.IntegerField()
    file = serializers.FileField()
