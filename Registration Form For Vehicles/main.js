// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqQXWdBjlAmnENYLTNnDDI3zJ8OVTGaR0",
    authDomain: "insure-bcd5c.firebaseapp.com",
    databaseURL: "https://insure-bcd5c-default-rtdb.firebaseio.com",
    projectId: "insure-bcd5c",
    storageBucket: "insure-bcd5c.firebasestorage.app",
    messagingSenderId: "690492196645",
    appId: "1:690492196645:web:c4de1f8530c03321fb7ccc"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the database
const contactFormDB = ref(database, 'contactForm');

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get form values
    var name = getElementVal('name');
    var email = getElementVal('email');
    var phone = getElementVal('phone');
    var carNo = getElementVal('carNo');
    var hasInsurance = document.querySelector('input[name="hasInsurance"]:checked')?.value || 'Not selected';
    var location = getElementVal('location');
    var previousClaim = document.querySelector('input[name="previousClaim"]:checked')?.value || 'Not selected';
    var claims = document.getElementById('claims').value || 'N/A';

    // Save to Firebase
    saveContactInfo(name, email, phone, carNo, hasInsurance, location, previousClaim, claims);

    // Show success message
    showMessage('Registration successful!', 'success');

    // Reset form
    document.getElementById('registrationForm').reset();
    document.getElementById('claimsSection').style.display = 'none';
}

const saveContactInfo = (name, email, phone, carNo, hasInsurance, location, previousClaim, claims) => {
    var newContactForm = push(contactFormDB);
    set(newContactForm, {
        name: name,
        email: email,
        phone: phone,
        carNo: carNo,
        hasInsurance: hasInsurance,
        location: location,
        previousClaim: previousClaim,
        claims: claims,
        timestamp: new Date().toISOString()
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
