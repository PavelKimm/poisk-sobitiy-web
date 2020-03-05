from mongoengine import *

connect('events_search')


class SensorsData(Document):
    oilfield = StringField()
    well_cluster = IntField()
    well_number = IntField()
    timestamp = DateTimeField()
    pressure_before = FloatField(null=True)
    pressure_after = FloatField(null=True)
    temperature_before = FloatField(null=True)
    consumption_before = FloatField(null=True)

    meta = {
        'indexes': [
            {'fields': ('oilfield', 'well_cluster', 'well_number', 'timestamp'), 'unique': True}
        ]
    }

    def __str__(self):
        return f"{self.well_number} - {self.timestamp}"
