from crewai import Task
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytesseract
from pdf2image import convert_from_path
import cv2
import numpy as np

class ClaimTasks:
    def create_document_verification_task(self, agent, document_path):
        return Task(
            description=f"""
            1. Analyze the document at {document_path}
            2. Extract all relevant information using OCR if necessary
            3. Verify the authenticity of the document
            4. Check for any signs of tampering or inconsistencies
            5. Ensure all required fields are present and valid
            6. Return a detailed report of findings
            """,
            agent=agent,
            context=f"Document path: {document_path}",
            expected_output="A detailed verification report including document validity and extracted information"
        )

    def create_fraud_detection_task(self, agent, form_data):
        return Task(
            description=f"""
            1. Navigate to https://frauddetectionhack.streamlit.app/
            2. Fill in all required fields with the provided data: {form_data}
            3. Submit the form and analyze the fraud detection results
            4. Based on the results, determine if the claim should be processed
            5. If approved, prepare the claim form for submission
            """,
            agent=agent,
            context=f"Form data: {form_data}",
            expected_output="Fraud detection results and claim processing decision"
        )

    @staticmethod
    def process_document(document_path):
        # Handle PDF documents
        if document_path.lower().endswith('.pdf'):
            images = convert_from_path(document_path)
            text = ""
            for image in images:
                text += pytesseract.image_to_string(image)
            return text
        
        # Handle image documents
        elif document_path.lower().endswith(('.png', '.jpg', '.jpeg')):
            image = cv2.imread(document_path)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            text = pytesseract.image_to_string(gray)
            return text
        
        return "Unsupported document format"

    @staticmethod
    def interact_with_fraud_site(form_data):
        driver = webdriver.Chrome()
        try:
            driver.get("https://frauddetectionhack.streamlit.app/")
            
            # Fill form fields
            for field, value in form_data.items():
                element = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.NAME, field))
                )
                element.send_keys(value)
            
            # Find and click the detect fraud button
            detect_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Detect Fraud')]"))
            )
            detect_button.click()
            
            # Wait for and get results
            result = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "fraud-result"))
            ).text
            
            return result
        finally:
            driver.quit() 