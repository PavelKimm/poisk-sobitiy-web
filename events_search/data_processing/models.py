from django.db import models


class SensorsData(models.Model):
    well_number = models.IntegerField()
    timestamp = models.DateTimeField()
    pressure_before = models.FloatField(null=True)
    pressure_after = models.FloatField(null=True)
    temperature_before = models.FloatField(null=True)
    consumption_before = models.FloatField(null=True)

    class Meta:
        verbose_name_plural = 'Sensors data'
        unique_together = (('well_number', 'timestamp'),)

    def __str__(self):
        return f"{self.well_number} - {self.timestamp}"
