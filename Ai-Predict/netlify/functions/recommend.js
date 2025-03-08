const { GoogleGenerativeAI } = require("@google/generative-ai");

// Insurance plans data
const insurancePlans = {
    // ... copy of insurancePlans data ...
};

function getFallbackRecommendation(userProfile) {
    let recommendedType = "third-party";
    let reasoning = [];
    
    if (userProfile.vehicleType === "Luxury" || userProfile.budget === "High") {
        recommendedType = "comprehensive";
        reasoning.push("Luxury vehicle requires comprehensive coverage");
    } else if (parseInt(userProfile.annualMileage) < 10000 && userProfile.vehicleUsage === "Occasional") {
        recommendedType = "trending";
        reasoning.push("Low mileage and occasional usage suits pay-as-you-drive option");
    } else if (userProfile.parkingType === "Street parking" || userProfile.location === "Urban") {
        recommendedType = "own-damage";
        reasoning.push("Street parking and urban location suggests higher risk of damage");
    }

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

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    try {
        const userProfile = JSON.parse(event.body);
        
        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        try {
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
                return {
                    statusCode: 200,
                    body: getFallbackRecommendation(userProfile)
                };
            }

            return {
                statusCode: 200,
                body: aiRecommendation
            };

        } catch (error) {
            console.error("Error in Gemini API:", error);
            console.log("Using fallback recommendation system");
            return {
                statusCode: 200,
                body: getFallbackRecommendation(userProfile)
            };
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request body' })
        };
    }
}; 