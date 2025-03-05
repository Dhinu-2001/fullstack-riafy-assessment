# Registering the appointments model in admin.py

from django.contrib import admin
from .models import Appointment

admin.site.register(Appointment)