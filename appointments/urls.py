from django.urls import path
from .views import available_slots, book_appointment, booking_page

urlpatterns = [
    path('booking/', booking_page, name='booking-page'),
    path('available-slots/', available_slots, name='available-slots'),
    path('book-appointment/', book_appointment, name='book-appointment'),
]