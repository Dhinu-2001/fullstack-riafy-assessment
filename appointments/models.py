# Model for appointments
from django.db import models

class Appointment(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    date = models.DateField()
    time_slot = models.TimeField()

    class Meta:
        unique_together = ('date', 'time_slot')  # For preventing double-booking