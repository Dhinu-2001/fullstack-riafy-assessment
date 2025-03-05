from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Appointment
from .serializers import AppointmentSerializer
from datetime import time
from django.shortcuts import render

AVAILABLE_SLOTS = [
    time(10, 0), time(10, 30), time(11, 0), time(11, 30),
    time(12, 0), time(12, 30), time(2, 0), time(2, 30),
    time(3, 0), time(3, 30), time(4, 0), time(4, 30)
]

def booking_page(request):
    return render(request, 'booking.html')

@api_view(['GET'])
def available_slots(request):
    date = request.GET.get('date')
    if not date:
        return Response({'error': 'Date is required'}, status=400)
    booked_slots = Appointment.objects.filter(date=date).values_list('time_slot', flat=True)
    slots = [slot for slot in AVAILABLE_SLOTS if slot not in booked_slots]
    return Response({'available_slots': slots})

@api_view(['POST'])
def book_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)