from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/claims')
def claims():
    return render_template('claims.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/vehicle-insurance')
def vehicle_insurance():
    return render_template('car_insurance.html')

@app.route('/vehicle-insurance/new')
def new_vehicle_insurance():
    return render_template('new_vehicle_insurance.html')

@app.route('/vehicle-insurance/manage')
def manage_vehicle_insurance():
    return render_template('manage_vehicle_insurance.html')

if __name__ == '__main__':
    app.run(debug=True) 