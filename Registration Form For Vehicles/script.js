document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const previousClaimYes = document.getElementById('previousClaimYes');
    const previousClaimNo = document.getElementById('previousClaimNo');
    const claimsSection = document.getElementById('claimsSection');
    const claimsInput = document.getElementById('claims');

    // Handle previous claim radio button changes
    previousClaimYes.addEventListener('change', function() {
        claimsSection.style.display = 'block';
        claimsInput.required = true;
        // Add slide down animation
        claimsSection.style.animation = 'slideDown 0.3s ease forwards';
    });

    previousClaimNo.addEventListener('change', function() {
        claimsSection.style.display = 'none';
        claimsInput.required = false;
        claimsInput.value = '';
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get all form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            carNo: document.getElementById('carNo').value,
            hasInsurance: document.querySelector('input[name="hasInsurance"]:checked')?.value || 'Not selected',
            location: document.getElementById('location').value,
            hasPreviousClaims: document.querySelector('input[name="previousClaim"]:checked')?.value || 'Not selected',
            numberOfClaims: previousClaimYes.checked ? document.getElementById('claims').value : 'N/A'
        };

        // Here you can handle the form submission
        console.log('Form Data:', formData);
        
        // Show success message
        showMessage('Registration successful!', 'success');
        
        // Optional: Reset form
        form.reset();
        claimsSection.style.display = 'none';
    });

    // Function to show messages
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        form.parentElement.insertBefore(messageDiv, form);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
});

// Add this to your CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .message {
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        animation: slideDown 0.3s ease forwards;
    }

    .message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    </style>
`); 