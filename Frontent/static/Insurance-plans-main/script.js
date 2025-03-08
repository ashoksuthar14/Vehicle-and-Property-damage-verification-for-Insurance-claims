const insurancePlans = {
    "third-party": [
        { name: "Bajaj", logo: "images/bajaj.png", price: "$200", insuranceTypes: "Third Party", about: "Bajaj Allianz is a renowned provider of third-party car insurance with extensive coverage and affordable pricing." },
        { name: "Chola MS", logo: "images/cholams.png", price: "$220", insuranceTypes: "Third Party", about: "Chola MS offers reliable third-party car insurance, ensuring hassle-free claims." },
        { name: "Digit", logo: "images/digit.png", price: "$250", insuranceTypes: "Third Party", about: "Digit provides comprehensive third-party insurance with a customer-friendly experience." },
        { name: "Future Generali", logo: "images/futuregeneral.png", price: "$210", insuranceTypes: "Third Party", about: "Future Generali's third-party insurance offers quality coverage and fast claims." },
        { name: "ICICI Lombard", logo: "images/icici lombard.png", price: "$230", insuranceTypes: "Third Party", about: "ICICI Lombard is a leading insurer known for robust third-party coverage." },
        { name: "HDFC ERGO", logo: "images/hdfcergo.png", price: "$240", insuranceTypes: "Third Party", about: "HDFC ERGO provides secure third-party insurance with nationwide coverage." },
        { name: "SBI General", logo: "images/sbi general.png", price: "$200", insuranceTypes: "Third Party", about: "SBI General's third-party insurance is affordable with a smooth claims process." },
        { name: "ZUNO", logo: "images/zuno.png", price: "$220", insuranceTypes: "Third Party", about: "ZUNO offers reliable third-party insurance with excellent customer service." },
        { name: "Sriram General Insurance", logo: "images/sriram general.png", price: "$250", insuranceTypes: "Third Party", about: "Sriram General Insurance provides effective third-party coverage with easy claims." },
        { name: "United India Insurance", logo: "images/united india insurance.png", price: "$210", insuranceTypes: "Third Party", about: "United India Insurance is a trusted provider of third-party car insurance." }
    ],
    "comprehensive": [
        { name: "Bajaj", logo: "images/bajaj.png", price: "$300", planType: "Comprehensive", about: "Bajaj Allianz provides full coverage with a focus on customer satisfaction." },
        { name: "Chola MS", logo: "images/cholams.png", price: "$320", planType: "Comprehensive", about: "Chola MS offers strong comprehensive car insurance with wide coverage." },
        { name: "Digit", logo: "images/digit.png", price: "$350", planType: "Comprehensive", about: "Digit's comprehensive insurance ensures peace of mind with extensive coverage." },
        { name: "Future Generali", logo: "images/futuregeneral.png", price: "$310", planType: "Comprehensive", about: "Future Generali provides complete protection with flexible options." },
        { name: "HDFC ERGO", logo: "images/hdfcergo.png", price: "$330", planType: "Comprehensive", about: "HDFC ERGO comprehensive insurance combines affordability and coverage." },
        { name: "ICICI Lombard", logo: "images/icici lombard.png", price: "$340", planType: "Comprehensive", about: "ICICI Lombard offers top-notch comprehensive insurance with extensive benefits." },
        { name: "SBI General", logo: "images/sbi general.png", price: "$300", planType: "Comprehensive", about: "SBI General's comprehensive insurance is affordable and reliable." },
        { name: "TATA", logo: "images/tata.png", price: "$320", planType: "Comprehensive", about: "TATA offers premium comprehensive insurance with great coverage." },
        { name: "Zurich Kotak", logo: "images/kotak.png", price: "$350", planType: "Comprehensive", about: "Zurich Kotak provides superior comprehensive coverage with ease of claim." },
        { name: "Reliance General Insurance", logo: "images/reliance.png", price: "$310", planType: "Comprehensive", about: "Reliance General Insurance offers reliable comprehensive coverage." }
    ],
    "own-damage": [
        { name: "Bajaj", logo: "images/bajaj.png", price: "$400", planType: "Own Damage", about: "Bajaj Allianz covers own-damage with fast claim processing." },
        { name: "Digit", logo: "images/digit.png", price: "$420", planType: "Own Damage", about: "Digit offers wide own-damage coverage with reliable service." },
        { name: "Liberty General Insurance", logo: "images/liberty.png", price: "$450", planType: "Own Damage", about: "Liberty General Insurance focuses on effective own-damage protection." },
        { name: "Oriental Insurance", logo: "images/oriental.png", price: "$410", planType: "Own Damage", about: "Oriental Insurance provides strong coverage for own-damage cases." },
        { name: "SBI General", logo: "images/sbi general.png", price: "$430", planType: "Own Damage", about: "SBI General is a dependable option for own-damage insurance." },
        { name: "Sriram General Insurance", logo: "images/sriram general.png", price: "$440", planType: "Own Damage", about: "Sriram General Insurance offers effective own-damage policies." },
        { name: "TATA", logo: "images/tata.png", price: "$400", planType: "Own Damage", about: "TATA provides own-damage insurance with extensive options." },
        { name: "ZUNO", logo: "images/zuno.png", price: "$420", planType: "Own Damage", about: "ZUNO offers comprehensive own-damage protection." },
        { name: "Zurich Kotak", logo: "images/kotak.png", price: "$450", planType: "Own Damage", about: "Zurich Kotak covers own-damage with ease of claims." },
        { name: "ICICI Lombard", logo: "images/icici lombard.png", price: "$410", planType: "Own Damage", about: "ICICI Lombard provides robust own-damage coverage." }
    ],
    "trending": [
        { name: "Bajaj", logo: "images/bajaj.png", price: "$500", planType: "Pay As You Drive", ClaimsSettled: "98%", ClaimBenefits: "Repair Anywhere, 50% Advance Payment", about: "Bajaj's pay-as-you-drive option combines flexibility and affordability." },
        { name: "Digit", logo: "images/digit.png", price: "$520", planType: "Pay As You Drive", ClaimsSettled: "96%", ClaimBenefits: "6-Month Repair Warranty, 50% Advance Payment, Free Pick-up & Drop", about: "Digit's pay-as-you-drive plan offers ease and comprehensive coverage." },
        { name: "ICICI Lombard", logo: "images/icici lombard.png", price: "$550", planType: "Pay As You Drive", ClaimsSettled: "96.75%", ClaimBenefits: "On-Ground Support, Self-video Claims, Zero Paper Claims", about: "ICICI Lombard pay-as-you-drive provides hassle-free claims." },
        { name: "Reliance General Insurance", logo: "images/reliance.png", price: "$510", planType: "Pay As You Drive", ClaimsSettled: "98%", ClaimBenefits: "Cashless Claims, Self-video Claims, Spot Claims up to 20,000", about: "Reliance General Insurance is ideal for pay-as-you-drive options." },
        { name: "ZUNO", logo: "images/zuno.png", price: "$530", planType: "Pay As You Drive", ClaimsSettled: "98%", ClaimBenefits: "Zero Paper Claims, 6-Month Repair Warranty, Free Pick-up & Drop", about: "ZUNO offers hassle-free pay-as-you-drive insurance." }
    ]
};

// Function to open modal with plan details
const getPlanDetails = (planName) => {
    let plan;
    Object.keys(insurancePlans).forEach(planType => {
        plan = insurancePlans[planType].find(p => p.name === planName) || plan;
    });

    if (plan) {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <img src="${plan.logo}" alt="${plan.name} Logo" style="width: 100px; height: auto;">
            <h2>${plan.name}</h2>
            <p><strong>About:</strong> ${plan.about}</p>
            <p><strong>Price:</strong> ${plan.price}</p>
            <p><strong>Plan Type:</strong> ${plan.planType || plan.insuranceTypes}</p>
            ${plan.ClaimsSettled ? `<p><strong>Claims Settled:</strong> ${plan.ClaimsSettled}</p>` : ""}
            ${plan.ClaimBenefits ? `<p><strong>Claim Benefits:</strong> ${plan.ClaimBenefits}</p>` : ""}
            <button onclick="closeModal()">Close</button>
            <button onclick="buyNow('${plan.name}')">Buy Now</button>
        `;

        document.getElementById('modal').style.display = 'block';
    }
};

// Function to handle 'Buy Now' button click
const buyNow = (planName) => {
    alert(`You have chosen to buy the ${planName} plan.`);
};

// Function to close modal
const closeModal = () => {
    document.getElementById('modal').style.display = 'none';
};

// Update the button onclick in createCards to use getPlanDetails instead
const createCards = (planType) => {
    const cardContainer = document.getElementById(`${planType}-cards`);
    insurancePlans[planType].forEach(plan => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${plan.logo}" alt="${plan.name} Logo">
            <h3>${plan.name}</h3>
            <p class="price">${plan.price}</p>
            <p>Plan Type: ${plan.planType || plan.insuranceTypes}</p>
            ${plan.ClaimsSettled ? `<p>Claims Settled: ${plan.ClaimsSettled}</p>` : ""}
            ${plan.ClaimBenefits ? `<p>Claim Benefits: ${plan.ClaimBenefits}</p>` : ""}
            <button onclick="getPlanDetails('${plan.name}')">Get Plan</button>
        `;
        cardContainer.appendChild(card);
    });
};

// Generate cards for each plan type
['third-party', 'comprehensive', 'own-damage', 'trending'].forEach(createCards);

// contact deatils
document.getElementById("contact-link").addEventListener("click", function (event) {
    event.preventDefault();
    const contactBox = document.getElementById("contact-info-box");
    contactBox.style.display = contactBox.style.display === "none" ? "block" : "none";
});

// Close the contact box if clicked outside
window.addEventListener("click", function (event) {
    const contactBox = document.getElementById("contact-info-box");
    if (event.target !== document.getElementById("contact-link") && event.target !== contactBox) {
        contactBox.style.display = "none";
    }
});
