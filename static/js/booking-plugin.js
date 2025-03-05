// booking-plugin.js
(function () {
    const API_URL = 'http://localhost:8000/api';
    
    function fetchAvailableSlots(date) {
        return fetch(`${API_URL}/available-slots/?date=${date}`)
            .then(response => response.json());
    }
    
    function bookAppointment(data) {
        return fetch(`${API_URL}/book-appointment/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json());
    }
    
    function createBookingWidget() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div id="booking-widget">
                <h3>Book an Appointment</h3>
                <input type="date" id="booking-date" required />
                <select id="booking-time"></select>
                <input type="text" id="name" placeholder="Your Name" required />
                <input type="text" id="phone" placeholder="Phone Number" required />
                <button id="book-btn">Book Now</button>
                <p id="booking-message"></p>
            </div>
        `;
        document.body.appendChild(container);
        
        document.getElementById('booking-date').addEventListener('change', updateAvailableSlots);
        document.getElementById('book-btn').addEventListener('click', handleBooking);
    }
    
    function updateAvailableSlots() {
        const date = document.getElementById('booking-date').value;
        fetchAvailableSlots(date).then(data => {
            const timeSelect = document.getElementById('booking-time');
            timeSelect.innerHTML = '';
            data.available_slots.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                timeSelect.appendChild(option);
            });
        });
    }
    
    function validateForm(name, phone) {
        const phonePattern = /^\d{10}$/; // Ensures a 10-digit number
        if (name.trim().length < 3) {
            document.getElementById('booking-message').textContent = 'Name must be at least 3 characters long';
            return false;
        }
        if (!phonePattern.test(phone)) {
            document.getElementById('booking-message').textContent = 'Enter a valid 10-digit phone number';
            return false;
        }
        return true;
    }
    
    function handleBooking() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        
        if (!name || !phone || !date || !time) {
            document.getElementById('booking-message').textContent = 'All fields are required!';
            return;
        }
        
        if (!validateForm(name, phone)) {
            return;
        }
        
        bookAppointment({ name, phone, date, time_slot: time })
            .then(response => {
                document.getElementById('booking-message').textContent = 'Appointment booked successfully!';
            })
            .catch(error => {
                document.getElementById('booking-message').textContent = 'Booking failed! Try again.';
            });
    }
    
    createBookingWidget();
})();
