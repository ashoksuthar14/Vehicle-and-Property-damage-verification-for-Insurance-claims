from langchain.agents import initialize_agent, Tool, AgentType
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.tools import BaseTool
from typing import Any
import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
import random

# Load environment variables
load_dotenv()

# Configure Google Gemini
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

class ClaimFormTool(BaseTool):
    name: str = "claim_form_generator"
    description: str = """Generate appropriate data for an insurance claim form with the following fields:
    - age: numeric value between 18 and 80
    - months_as_customer: numeric value between 1 and 240
    - policy_number: string in format 'POL-XXXXX' where X is a digit
    - policy_state: one of ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "MI", "NJ", "NC"]
    - policy_deductible: numeric value between 500 and 2000
    - policy_annual_premium: numeric value between 500 and 2500
    - umbrella_limit: numeric value between 0 and 2000000
    - insured_sex: one of ["MALE", "FEMALE"]
    - insured_education: one of ["High School", "College", "Masters", "PhD"]
    - insured_occupation: one of ["Professional", "Manager", "Clerical", "Student"]
    - insured_relationship: one of ["Self", "Spouse", "Child", "Other"]
    - capital_gains: numeric value between 0 and 100000
    - capital_loss: numeric value between 0 and 100000
    - incident_type: one of ["Multi-vehicle Collision", "Single Vehicle Collision", "Vehicle Theft"]
    - collision_type: one of ["Front Collision", "Rear Collision", "Side Collision", "NA"]
    - incident_severity: one of ["Minor Damage", "Major Damage", "Total Loss"]
    - authorities_contacted: one of ["Police", "Fire", "Ambulance", "None"]
    - incident_state: one of ["CA", "NY", "TX", "FL", "IL", "PA", "OH", "MI", "NJ", "NC"]
    - incident_city: string (city name in the selected state)
    - incident_hour: numeric value between 0 and 23
    - number_of_vehicles: numeric value between 1 and 5
    - property_damage: one of ["YES", "NO"]
    - bodily_injuries: numeric value between 0 and 4
    - witnesses: numeric value between 0 and 5
    - police_report: one of ["YES", "NO"]
    - injury_claim: numeric value between 0 and 50000
    - property_claim: numeric value between 0 and 50000
    - vehicle_claim: numeric value between 0 and 50000

    Generate realistic and consistent data based on the incident type and severity."""
    return_direct: bool = False

    def _run(self, query: str) -> str:
        try:
            # Generate a realistic claim scenario
            scenario = self._generate_scenario()
            return json.dumps(scenario, indent=2)
        except Exception as e:
            return f"Error generating claim data: {str(e)}"

    def _generate_scenario(self) -> dict:
        # Common city names for each state
        state_cities = {
            "CA": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
            "NY": ["New York City", "Buffalo", "Albany", "Rochester"],
            "TX": ["Houston", "Dallas", "Austin", "San Antonio"],
            "FL": ["Miami", "Orlando", "Tampa", "Jacksonville"],
            "IL": ["Chicago", "Springfield", "Peoria", "Rockford"],
            "PA": ["Philadelphia", "Pittsburgh", "Harrisburg", "Erie"],
            "OH": ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
            "MI": ["Detroit", "Grand Rapids", "Lansing", "Ann Arbor"],
            "NJ": ["Newark", "Jersey City", "Trenton", "Atlantic City"],
            "NC": ["Charlotte", "Raleigh", "Durham", "Greensboro"]
        }

        # Select incident type and adjust other fields accordingly
        incident_type = random.choice([
            "Multi-vehicle Collision",
            "Single Vehicle Collision",
            "Vehicle Theft"
        ])

        # Generate base scenario
        incident_state = random.choice(list(state_cities.keys()))
        
        scenario = {
            "age": random.randint(18, 80),
            "months_as_customer": random.randint(1, 240),
            "policy_number": f"POL-{random.randint(10000, 99999)}",
            "policy_state": incident_state,
            "policy_deductible": random.choice([500, 1000, 1500, 2000]),
            "policy_annual_premium": random.randint(500, 2500),
            "umbrella_limit": random.randint(0, 2000000),
            "insured_sex": random.choice(["MALE", "FEMALE"]),
            "insured_education": random.choice(["High School", "College", "Masters", "PhD"]),
            "insured_occupation": random.choice(["Professional", "Manager", "Clerical", "Student"]),
            "insured_relationship": random.choice(["Self", "Spouse", "Child", "Other"]),
            "capital_gains": random.randint(0, 100000),
            "capital_loss": random.randint(0, 100000),
            "incident_type": incident_type,
            "incident_state": incident_state,
            "incident_city": random.choice(state_cities[incident_state]),
            "incident_hour": random.randint(0, 23)
        }

        # Adjust fields based on incident type
        if incident_type == "Vehicle Theft":
            scenario.update({
                "collision_type": "NA",
                "incident_severity": "Total Loss",
                "number_of_vehicles": 1,
                "bodily_injuries": 0,
                "property_damage": random.choice(["YES", "NO"]),
                "witnesses": random.randint(0, 3),
                "police_report": "YES",
                "injury_claim": 0,
                "property_claim": random.randint(1000, 5000),
                "vehicle_claim": random.randint(15000, 50000)
            })
        else:
            severity = random.choice(["Minor Damage", "Major Damage", "Total Loss"])
            num_vehicles = 1 if incident_type == "Single Vehicle Collision" else random.randint(2, 5)
            
            scenario.update({
                "collision_type": random.choice(["Front Collision", "Rear Collision", "Side Collision"]),
                "incident_severity": severity,
                "number_of_vehicles": num_vehicles,
                "property_damage": "YES" if severity in ["Major Damage", "Total Loss"] else random.choice(["YES", "NO"]),
                "bodily_injuries": random.randint(0, 4),
                "witnesses": random.randint(0, 5),
                "police_report": "YES" if severity in ["Major Damage", "Total Loss"] else random.choice(["YES", "NO"]),
                "authorities_contacted": random.choice(["Police", "Fire", "Ambulance", "None"])
            })

            # Set claim amounts based on severity
            if severity == "Minor Damage":
                scenario.update({
                    "injury_claim": random.randint(0, 15000),
                    "property_claim": random.randint(0, 10000),
                    "vehicle_claim": random.randint(5000, 15000)
                })
            elif severity == "Major Damage":
                scenario.update({
                    "injury_claim": random.randint(10000, 35000),
                    "property_claim": random.randint(5000, 25000),
                    "vehicle_claim": random.randint(15000, 35000)
                })
            else:  # Total Loss
                scenario.update({
                    "injury_claim": random.randint(20000, 50000),
                    "property_claim": random.randint(15000, 50000),
                    "vehicle_claim": random.randint(25000, 50000)
                })

        return scenario

    async def _arun(self, query: str) -> str:
        raise NotImplementedError("This tool does not support async")

def setup_agents():
    try:
        # Initialize the Gemini model
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-pro-latest",
            temperature=0.7,
            convert_system_message_to_human=True,
            google_api_key=api_key,
            top_p=0.8,
            top_k=40,
            max_output_tokens=2048
        )

        # Create tools
        tools = [ClaimFormTool()]

        # Initialize the agent
        agent = initialize_agent(
            tools,
            llm,
            agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True,
            max_iterations=5
        )

        return agent
    except Exception as e:
        print(f"Error setting up Gemini agent: {str(e)}")
        raise