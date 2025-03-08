from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch car details
@app.route('/get_car_details', methods=['POST'])
def get_car_details():
    car_number = request.form['car_number']

    # Define the API URL and payload
    url = "https://rto-vehicle-information-india.p.rapidapi.com/getVehicleInfo"
    payload = {
        "vehicle_no": car_number,
        "consent": "Y",
        "consent_text": "I hereby give my consent for Eccentric Labs API to fetch my information"
    }
    headers = {
        "x-rapidapi-key": "7458cf71bamsh0340226ea8662b8p12bb4bjsn73f7055b0f96",  # Your RapidAPI Key
        "x-rapidapi-host": "rto-vehicle-information-india.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    # Make the API request
    response = requests.post(url, json=payload, headers=headers)

    # If successful, return the car details
    if response.status_code == 200:
        car_data = response.json()
        return jsonify(car_data)
    else:
        return jsonify({"error": "Unable to fetch car details. Please try again."})

if __name__ == '__main__':
    app.run(debug=True)
