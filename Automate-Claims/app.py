import streamlit as st
import os
from langchain_agents import setup_agents
import json

# Set page configuration
st.set_page_config(
    page_title="AI-Powered Claim Processing",
    page_icon="🤖",
    layout="wide"
)

# Custom CSS for better UI
st.markdown("""
    <style>
    .stApp {
        max-width: 1200px;
        margin: 0 auto;
    }
    .main-header {
        font-size: 2.5rem;
        color: #1E88E5;
        text-align: center;
        margin-bottom: 2rem;
    }
    .sub-header {
        font-size: 1.5rem;
        color: #424242;
        margin-bottom: 1rem;
    }
    .status-box {
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }
    .success {
        background-color: #C8E6C9;
        color: #2E7D32;
    }
    .error {
        background-color: #FFCDD2;
        color: #C62828;
    }
    </style>
""", unsafe_allow_html=True)

# Initialize session state
if 'form_data' not in st.session_state:
    st.session_state.form_data = None

# Header
st.markdown("<h1 class='main-header'>AI-Powered Claim Processing System</h1>", unsafe_allow_html=True)

# Auto-fill button
if st.button("🤖 Auto-fill Form"):
    with st.spinner('Generating claim data...'):
        try:
            agent = setup_agents()
            st.write("Agent initialized successfully")  # Debug log
            
            result = agent.run("Generate a new claim scenario")
            st.write("Raw result from agent:", result)  # Debug log
            
            # Parse the JSON result
            try:
                form_data = json.loads(result)
                st.session_state.form_data = form_data
                st.success("Form auto-filled successfully!")
                st.write("Generated data:", form_data)  # Show the generated data
            except json.JSONDecodeError as je:
                st.error(f"Error parsing JSON response: {str(je)}")
                st.write("Raw response that couldn't be parsed:", result)
        except Exception as e:
            st.error(f"Error generating claim data: {str(e)}")
            import traceback
            st.write("Full error:", traceback.format_exc())  # Show full error trace

# Create form
st.markdown("<h2 class='sub-header'>Claim Information</h2>", unsafe_allow_html=True)

with st.form("claim_form"):
    # Personal Information
    st.subheader("Personal Information")
    col1, col2 = st.columns(2)
    with col1:
        age = st.number_input("Age", min_value=0, max_value=120, 
                            value=st.session_state.form_data.get("age", 0) if st.session_state.form_data else 0)
        months_as_customer = st.number_input("Months as Customer", min_value=0,
                            value=st.session_state.form_data.get("months_as_customer", 0) if st.session_state.form_data else 0)
        insured_sex = st.selectbox("Insured Sex", ["MALE", "FEMALE"],
                            index=0 if not st.session_state.form_data else 
                            0 if st.session_state.form_data.get("insured_sex") == "MALE" else 1)
        insured_education = st.selectbox("Insured Education", 
            ["High School", "College", "Masters", "PhD"],
            index=["High School", "College", "Masters", "PhD"].index(
                st.session_state.form_data.get("insured_education", "High School")) if st.session_state.form_data else 0)
    with col2:
        insured_occupation = st.selectbox("Insured Occupation",
            ["Professional", "Manager", "Clerical", "Student"],
            index=["Professional", "Manager", "Clerical", "Student"].index(
                st.session_state.form_data.get("insured_occupation", "Professional")) if st.session_state.form_data else 0)
        insured_relationship = st.selectbox("Insured Relationship",
            ["Self", "Spouse", "Child", "Other"],
            index=["Self", "Spouse", "Child", "Other"].index(
                st.session_state.form_data.get("insured_relationship", "Self")) if st.session_state.form_data else 0)
        capital_gains = st.number_input("Capital Gains", min_value=0,
                            value=st.session_state.form_data.get("capital_gains", 0) if st.session_state.form_data else 0)
        capital_loss = st.number_input("Capital Loss", min_value=0,
                            value=st.session_state.form_data.get("capital_loss", 0) if st.session_state.form_data else 0)

    # Policy Information
    st.subheader("Policy Information")
    col1, col2 = st.columns(2)
    with col1:
        policy_number = st.text_input("Policy Number",
                            value=st.session_state.form_data.get("policy_number", "") if st.session_state.form_data else "")
        states = ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "MI", "NJ", "NC"]
        policy_state = st.selectbox("Policy State", states,
                            index=states.index(st.session_state.form_data.get("policy_state", "CA")) if st.session_state.form_data else 0)
    with col2:
        policy_deductible = st.number_input("Policy Deductible", min_value=0,
                            value=st.session_state.form_data.get("policy_deductible", 0) if st.session_state.form_data else 0)
        policy_annual_premium = st.number_input("Policy Annual Premium", min_value=0,
                            value=st.session_state.form_data.get("policy_annual_premium", 0) if st.session_state.form_data else 0)
        umbrella_limit = st.number_input("Umbrella Limit", min_value=0,
                            value=st.session_state.form_data.get("umbrella_limit", 0) if st.session_state.form_data else 0)

    # Incident Information
    st.subheader("Incident Information")
    col1, col2 = st.columns(2)
    with col1:
        incident_types = ["Multi-vehicle Collision", "Single Vehicle Collision", "Vehicle Theft"]
        incident_type = st.selectbox("Incident Type", incident_types,
                            index=incident_types.index(st.session_state.form_data.get("incident_type", incident_types[0])) if st.session_state.form_data else 0)
        collision_types = ["Front Collision", "Rear Collision", "Side Collision", "NA"]
        collision_type = st.selectbox("Collision Type", collision_types,
                            index=collision_types.index(st.session_state.form_data.get("collision_type", collision_types[0])) if st.session_state.form_data else 0)
        severity_types = ["Minor Damage", "Major Damage", "Total Loss"]
        incident_severity = st.selectbox("Incident Severity", severity_types,
                            index=severity_types.index(st.session_state.form_data.get("incident_severity", severity_types[0])) if st.session_state.form_data else 0)
        authority_types = ["Police", "Fire", "Ambulance", "None"]
        authorities_contacted = st.selectbox("Authorities Contacted", authority_types,
                            index=authority_types.index(st.session_state.form_data.get("authorities_contacted", authority_types[0])) if st.session_state.form_data else 0)
    with col2:
        incident_state = st.selectbox("Incident State", states,
                            index=states.index(st.session_state.form_data.get("incident_state", "CA")) if st.session_state.form_data else 0)
        incident_city = st.text_input("Incident City",
                            value=st.session_state.form_data.get("incident_city", "") if st.session_state.form_data else "")
        incident_hour = st.number_input("Incident Hour", min_value=0, max_value=23,
                            value=st.session_state.form_data.get("incident_hour", 0) if st.session_state.form_data else 0)
        number_of_vehicles = st.number_input("Number of Vehicles Involved", min_value=1,
                            value=st.session_state.form_data.get("number_of_vehicles", 1) if st.session_state.form_data else 1)

    # Claims Information
    st.subheader("Claims Information")
    col1, col2 = st.columns(2)
    with col1:
        property_damage = st.selectbox("Property Damage", ["YES", "NO"],
                            index=0 if not st.session_state.form_data else 
                            0 if st.session_state.form_data.get("property_damage") == "YES" else 1)
        bodily_injuries = st.number_input("Number of Bodily Injuries", min_value=0,
                            value=st.session_state.form_data.get("bodily_injuries", 0) if st.session_state.form_data else 0)
        witnesses = st.number_input("Number of Witnesses", min_value=0,
                            value=st.session_state.form_data.get("witnesses", 0) if st.session_state.form_data else 0)
    with col2:
        police_report = st.selectbox("Police Report Available", ["YES", "NO"],
                            index=0 if not st.session_state.form_data else 
                            0 if st.session_state.form_data.get("police_report") == "YES" else 1)
        injury_claim = st.number_input("Injury Claim Amount", min_value=0,
                            value=st.session_state.form_data.get("injury_claim", 0) if st.session_state.form_data else 0)
        property_claim = st.number_input("Property Claim Amount", min_value=0,
                            value=st.session_state.form_data.get("property_claim", 0) if st.session_state.form_data else 0)
        vehicle_claim = st.number_input("Vehicle Claim Amount", min_value=0,
                            value=st.session_state.form_data.get("vehicle_claim", 0) if st.session_state.form_data else 0)

    submit_button = st.form_submit_button("Save Claim")

if submit_button:
    # Create form data dictionary
    form_data = {
        "age": age,
        "months_as_customer": months_as_customer,
        "policy_number": policy_number,
        "policy_state": policy_state,
        "policy_deductible": policy_deductible,
        "policy_annual_premium": policy_annual_premium,
        "umbrella_limit": umbrella_limit,
        "insured_sex": insured_sex,
        "insured_education": insured_education,
        "insured_occupation": insured_occupation,
        "insured_relationship": insured_relationship,
        "capital_gains": capital_gains,
        "capital_loss": capital_loss,
        "incident_type": incident_type,
        "collision_type": collision_type,
        "incident_severity": incident_severity,
        "authorities_contacted": authorities_contacted,
        "incident_state": incident_state,
        "incident_city": incident_city,
        "incident_hour": incident_hour,
        "number_of_vehicles": number_of_vehicles,
        "property_damage": property_damage,
        "bodily_injuries": bodily_injuries,
        "witnesses": witnesses,
        "police_report": police_report,
        "injury_claim": injury_claim,
        "property_claim": property_claim,
        "vehicle_claim": vehicle_claim
    }
    
    st.success("Claim saved successfully!")
    st.json(form_data)