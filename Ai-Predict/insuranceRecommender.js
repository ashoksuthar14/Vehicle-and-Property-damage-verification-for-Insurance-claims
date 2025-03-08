const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyDxpPYK3d28vZqb7_xqC7ILHD6QAfF1ksI");

// Insurance plans data
const insurancePlans = {
    "third-party": [
        { name: "Bajaj", logo: "bajaj.png", price: "$200", insuranceTypes: "Third Party", about: "Bajaj Allianz is a renowned provider of third-party car insurance with extensive coverage and affordable pricing." },
        { name: "Chola MS", logo: "cholams.png", price: "$220", insuranceTypes: "Third Party", about: "Chola MS offers reliable third-party car insurance, ensuring hassle-free claims." },
        { name: "Digit", logo: "digit.png", price: "$250", insuranceTypes: "Third Party", about: "Digit provides comprehensive third-party insurance with a customer-friendly experience." },
        { name: "Future Generali", logo: "futuregeneral.png", price: "$210", insuranceTypes: "Third Party", about: "Future Generali's third-party insurance offers quality coverage and fast claims." },
        { name: "ICICI Lombard", logo: "icici lombard.png", price: "$230", insuranceTypes: "Third Party", about: "ICICI Lombard is a leading insurer known for robust third-party coverage." },
        { name: "HDFC ERGO", logo: "hdfcergo.png", price: "$240", insuranceTypes: "Third Party", about: "HDFC ERGO provides secure third-party insurance with nationwide coverage." },
        { name: "SBI General", logo: "sbi general.png", price: "$200", insuranceTypes: "Third Party", about: "SBI General's third-party insurance is affordable with a smooth claims process." },
        { name: "ZUNO", logo: "zuno.png", price: "$220", insuranceTypes: "Third Party", about: "ZUNO offers reliable third-party insurance with excellent customer service." },
        { name: "Sriram General Insurance", logo: "sriram general.png", price: "$250", insuranceTypes: "Third Party", about: "Sriram General Insurance provides effective third-party coverage with easy claims." },
        { name: "United India Insurance", logo: "united india insurance.png", price: "$210", insuranceTypes: "Third Party", about: "United India Insurance is a trusted provider of third-party car insurance." }
    ],
    "comprehensive": [
        { name: "Bajaj", logo: "bajaj.png", price: "$300", planType: "Comprehensive", about: "Bajaj Allianz provides full coverage with a focus on customer satisfaction." },
        { name: "Chola MS", logo: "cholams.png", price: "$320", planType: "Comprehensive", about: "Chola MS offers strong comprehensive car insurance with wide coverage." },
        { name: "Digit", logo: "digit.png", price: "$350", planType: "Comprehensive", about: "Digit's comprehensive insurance ensures peace of mind with extensive coverage." },
        { name: "Future Generali", logo: "futuregeneral.png", price: "$310", planType: "Comprehensive", about: "Future Generali provides complete protection with flexible options." },
        { name: "HDFC ERGO", logo: "hdfcergo.png", price: "$330", planType: "Comprehensive", about: "HDFC ERGO comprehensive insurance combines affordability and coverage." },
        { name: "ICICI Lombard", logo: "icici lombard.png", price: "$340", planType: "Comprehensive", about: "ICICI Lombard offers top-notch comprehensive insurance with extensive benefits." },
        { name: "SBI General", logo: "sbi general.png", price: "$300", planType: "Comprehensive", about: "SBI General's comprehensive insurance is affordable and reliable." },
        { name: "TATA", logo: "tata.png", price: "$320", planType: "Comprehensive", about: "TATA offers premium comprehensive insurance with great coverage." },
        { name: "Zurich Kotak", logo: "kotak.png", price: "$350", planType: "Comprehensive", about: "Zurich Kotak provides superior comprehensive coverage with ease of claim." },
        { name: "Reliance General Insurance", logo: "reliance.png", price: "$310", planType: "Comprehensive", about: "Reliance General Insurance offers reliable comprehensive coverage." }
    ],
    "own-damage": [
        { name: "Bajaj", logo: "bajaj.png", price: "$400", planType: "Own Damage", about: "Bajaj Allianz covers own-damage with fast claim processing." },
        { name: "Digit", logo: "digit.png", price: "$420", planType: "Own Damage", about: "Digit offers wide own-damage coverage with reliable service." },
        { name: "Liberty General Insurance", logo: "liberty.png", price: "$450", planType: "Own Damage", about: "Liberty General Insurance focuses on effective own-damage protection." },
        { name: "Oriental Insurance", logo: "oriental.png", price: "$410", planType: "Own Damage", about: "Oriental Insurance provides strong coverage for own-damage cases." },
        { name: "SBI General", logo: "sbi general.png", price: "$430", planType: "Own Damage", about: "SBI General is a dependable option for own-damage insurance." },
        { name: "Sriram General Insurance", logo: "sriram general.png", price: "$440", planType: "Own Damage", about: "Sriram General Insurance offers effective own-damage policies." },
        { name: "TATA", logo: "tata.png", price: "$400", planType: "Own Damage", about: "TATA provides own-damage insurance with extensive options." },
        { name: "ZUNO", logo: "zuno.png", price: "$420", planType: "Own Damage", about: "ZUNO offers comprehensive own-damage protection." },
        { name: "Zurich Kotak", logo: "kotak.png", price: "$450", planType: "Own Damage", about: "Zurich Kotak covers own-damage with ease of claims." },
        { name: "ICICI Lombard", logo: "icici lombard.png", price: "$410", planType: "Own Damage", about: "ICICI Lombard provides robust own-damage coverage." }
    ],
    "trending": [
        { name: "Bajaj", logo: "bajaj.png", price: "$500", planType: "Pay As You Drive", ClaimsSettled: "98%", ClaimBenefits: "Repair Anywhere, 50% Advance Payment", about: "Bajaj's pay-as-you-drive option combines flexibility and affordability." },
        { name: "Digit", logo: "digit.png", price: "$520", planType: "Pay As You Drive", ClaimsSettled: "96%", ClaimBenefits: "6-Month Repair Warranty, 50% Advance Payment, Free Pick-up & Drop", about: "Digit's pay-as-you-drive plan offers ease and comprehensive coverage." },
        { name: "ICICI Lombard", logo: "icici lombard.png", price: "$550", planType: "Pay As You Drive", ClaimsSettled: "96.75%", ClaimBenefits: "On-Ground Support, Self-video Claims, Zero Paper Claims", about: "ICICI Lombard pay-as-you-drive provides hassle-free claims." },
        { name: "Reliance General Insurance", logo: "reliance.png", price: "$510", planType: "Pay As You Drive", ClaimsSettled: "98%", ClaimBenefits: "Cashless Claims, Self-video Claims, Spot Claims up to 20,000", about: "Reliance General Insurance is ideal for pay-as-you-drive options." },
        { name: "ZUNO", logo: "zuno.png", price: "$530", planType: "Pay As You Drive", ClaimsSettled: "98%", ClaimBenefits: "Zero Paper Claims, 6-Month Repair Warranty, Free Pick-up & Drop", about: "ZUNO offers hassle-free pay-as-you-drive insurance." }
    ]
};

function getFallbackRecommendation(userProfile) {
    let recommendedType = "third-party";
    let reasoning = [];
    
    // Basic logic for recommendations
    if (userProfile.vehicleType === "Luxury" || userProfile.budget === "High") {
        recommendedType = "comprehensive";
        reasoning.push("Luxury vehicle requires comprehensive coverage");
    } else if (parseInt(userProfile.annualMileage) < 10000 && userProfile.vehicleUsage === "Occasional") {
        recommendedType = "trending"; // Pay as you drive
        reasoning.push("Low mileage and occasional usage suits pay-as-you-drive option");
    } else if (userProfile.parkingType === "Street parking" || userProfile.location === "Urban") {
        recommendedType = "own-damage";
        reasoning.push("Street parking and urban location suggests higher risk of damage");
    }

    // Get top 3 providers for the recommended type
    const providers = insurancePlans[recommendedType].slice(0, 3);

    return `
    <div class="recommendation-content">
        <h4 class="mb-4">Recommended Insurance Type: ${recommendedType.toUpperCase()}</h4>
        <div class="alert alert-warning mb-4">
            <strong>Reasoning:</strong> ${reasoning.join(", ")}
        </div>
        
        <h5 class="mb-3" style="color: var(--primary-color);">Top Recommended Providers:</h5>
        <div class="providers-list">
            ${providers.map(provider => `
                <div class="provider-card">
                    <h6>${provider.name}</h6>
                    <span class="price-tag">${provider.price}</span>
                    <p class="mt-2">${provider.about}</p>
                    ${provider.ClaimBenefits ? `
                        <div class="benefits mt-2">
                            <small style="color: var(--primary-color);">Benefits: ${provider.ClaimBenefits}</small>
                        </div>
                    ` : ''}
                    ${provider.ClaimsSettled ? `
                        <div class="claims mt-2">
                            <small style="color: var(--primary-color);">Claims Settled: ${provider.ClaimsSettled}</small>
                        </div>
                    ` : ''}
                </div>
            `).join("")}
        </div>

        <div class="mt-4">
            <h6 style="color: var(--primary-color);">Alternative Options:</h6>
            <p>Consider exploring other insurance types based on your changing needs:</p>
            <ul class="list-unstyled">
                ${Object.keys(insurancePlans)
                    .filter(type => type !== recommendedType)
                    .map(type => `
                        <li class="mb-2">
                            <span style="color: var(--primary-color);">• ${type.toUpperCase()}</span>: 
                            Starting from ${Math.min(...insurancePlans[type].map(p => parseInt(p.price.replace('$', ''))))}$
                        </li>
                    `).join("")}
            </ul>
        </div>
    </div>`;
}

async function recommendInsurance(userProfile) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        // First try with Gemini API
        const prompt = `
        Based on the following user profile, recommend the best insurance type and specific plans:
        
        User Profile:
        ${JSON.stringify(userProfile, null, 2)}
        
        Consider the following factors:
        1. Age and driving experience
        2. Location and vehicle usage
        3. Vehicle type and parking
        4. Budget and previous claims
        
        Please provide in HTML format:
        1. Recommended insurance type with reasoning
        2. Top 3 recommended insurance providers with their specific benefits
        3. Alternative options if available
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiRecommendation = response.text();

        if (!aiRecommendation || aiRecommendation.trim() === "") {
            console.log("Empty response from Gemini API, using fallback system");
            return getFallbackRecommendation(userProfile);
        }

        return aiRecommendation;

    } catch (error) {
        console.error("Error in Gemini API:", error);
        console.log("Using fallback recommendation system");
        return getFallbackRecommendation(userProfile);
    }
}

module.exports = {
    recommendInsurance
};