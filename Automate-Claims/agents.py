import os
from crewai import Agent
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
gemini = ChatGoogleGenerativeAI(model="gemini-pro")

class ClaimAgents:
    def __init__(self):
        self.document_agent = Agent(
            role='Document Verification Specialist',
            goal='Thoroughly analyze and verify documents for authenticity and completeness',
            backstory="""You are an expert in document verification with years of experience in 
            detecting fraudulent documents and ensuring all required information is present and valid.""",
            allow_delegation=False,
            llm=gemini,
            verbose=True
        )

        self.fraud_detection_agent = Agent(
            role='Fraud Detection and Form Specialist',
            goal='Interact with the fraud detection website and process claim forms based on results',
            backstory="""You are a specialist in fraud detection and automated form processing. 
            You analyze fraud detection results and make informed decisions about claim processing.""",
            allow_delegation=False,
            llm=gemini,
            verbose=True
        )

    def get_document_agent(self):
        return self.document_agent

    def get_fraud_detection_agent(self):
        return self.fraud_detection_agent 