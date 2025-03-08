# AI-Powered Claim Processing System

This application uses AI to process insurance claims by verifying documents and detecting potential fraud.

## Features

- Document verification using OCR and AI analysis
- Automated fraud detection through web form integration
- Modern Streamlit-based user interface
- Dual-agent system using Crew AI and Gemini

## Prerequisites

1. Python 3.8 or higher
2. Tesseract OCR
3. Poppler
4. Google Chrome browser

## Installation Steps

### 1. Install Poppler (Required for PDF processing)

#### Windows:
1. Download Poppler from [here](https://github.com/oschwartz10612/poppler-windows/releases/)
2. Extract the ZIP file
3. Move the extracted folder to `C:\Program Files\poppler`

#### Linux:
```bash
sudo apt-get install poppler-utils
```

#### macOS:
```bash
brew install poppler
```

### 2. Install Tesseract OCR

#### Windows:
1. Download the installer from [here](https://github.com/UB-Mannheim/tesseract/wiki)
2. Run the installer
3. Add Tesseract to your system PATH

#### Linux:
```bash
sudo apt-get install tesseract-ocr
```

#### macOS:
```bash
brew install tesseract
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

## Configuration

1. Make sure your `.env` file contains:
```
GOOGLE_API_KEY=your_gemini_api_key
```

2. Verify Poppler is in your system PATH (Windows only):
- Check if `C:\Program Files\poppler\Library\bin` exists
- If you installed Poppler in a different location, set the POPPLER_PATH environment variable

## Running the Application

```bash
streamlit run app.py
```

## Usage

1. Upload a document (PDF, PNG, or JPG)
2. Fill in the claim information form
3. Click "Process Claim"

## How it Works

1. The Document Verification Agent:
   - Analyzes uploaded documents using OCR
   - Verifies document authenticity
   - Extracts relevant information

2. The Fraud Detection Agent:
   - Processes the form data
   - Interacts with the fraud detection website
   - Determines claim validity

## Notes

- Ensure all system dependencies are properly installed
- The application requires an active internet connection
- Processing time may vary depending on document size and complexity

## Troubleshooting

### PDF Processing Issues
- Ensure Poppler is properly installed and in your system PATH
- For Windows users, verify the Poppler path in the error message
- Try restarting your terminal/IDE after installing Poppler

### Document Reading Issues
- Make sure the document is clear and readable
- Check if Tesseract OCR is properly installed
- For PDFs, ensure they are not password-protected

### Browser Automation Issues
- Ensure Google Chrome is installed
- Check if ChromeDriver is compatible with your Chrome version

## Support

If you encounter any issues:
1. Check if all dependencies are properly installed
2. Verify system PATH settings
3. Look for specific error messages in the console output

## License

This project is licensed under the MIT License - see the LICENSE file for details. 