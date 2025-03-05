# Instructions to Run the Project Locally

## Prerequisites
- Install Python (>=3.8)
- Install `pip` and `virtualenv`
- Node.js (optional for frontend testing)

## Setup Backend (Django REST Framework)
1. Clone the repository or navigate to your project folder:
   ```sh
   git clone https://github.com/Dhinu-2001/fullstack-riafy-assessment.git
   cd fullstack-riafy-assessment
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations and create a superuser:
   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Run the development server:
   ```sh
   python manage.py runserver
   ```
   - The API will be available at `http://127.0.0.1:8000/api/`
   - To view the booking UI `http://127.0.0.1:8000/api/booking/`
   - Admin panel at `http://127.0.0.1:8000/admin/`

## Setup Frontend (Booking Plugin)
1. Ensure the server is running (`python manage.py runserver`)
2. Open the `booking.html` file in a browser to test the UI
3. To embed the plugin in another site, use the following script:

```html
  <script src="http://localhost:8000/static/js/booking-plugin.js"></script>
```

# Script to Embed the Plugin on a Webpage
To embed the booking plugin on any webpage, add the following HTML code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Booking</title>
    <link rel="stylesheet" href="http://127.0.0.1:8000/static/appointments/booking-style.css">
</head>
<body>
    <div id="booking-widget"></div>
    <script src="{% static 'js/booking-plugin.js' %}"></script>
</body>
</html>
```

Replace `127.0.0.1:8000` with the actual hosted server URL when deploying. 🚀

