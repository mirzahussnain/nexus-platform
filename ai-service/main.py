from fastapi import FastAPI
from pydantic import BaseModel
import spacy
import subprocess
import sys

# Load the English language model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading language model for the first time...")
    subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

app = FastAPI()

# Input format (DTO)
class TicketText(BaseModel):
    description: str

# Our "Knowledge Base" of urgent words
HIGH_URGENCY_KEYWORDS = ["leak", "burst", "fire", "smoke", "flood", "gas", "explode", "spark"]
MEDIUM_URGENCY_KEYWORDS = ["mold", "damp", "heating", "boiler", "hot water", "lock", "window"]

@app.post("/analyze")
def analyze_urgency(ticket: TicketText):
    # 1. AI Processing: Normalize text (lowercase, remove punctuation)
    doc = nlp(ticket.description.lower())
    
    # 2. Lemma matching (better than simple string matching)
    # "leaking" -> "leak", "flooded" -> "flood"
    tokens = [token.lemma_ for token in doc]
    
    urgency = "LOW" # Default
    score = 0
    
    # 3. The Scoring Logic
    # Check for HIGH urgency words
    if any(word in tokens for word in HIGH_URGENCY_KEYWORDS):
        urgency = "HIGH"
        score = 100
    # Check for MEDIUM urgency words
    elif any(word in tokens for word in MEDIUM_URGENCY_KEYWORDS):
        urgency = "MEDIUM"
        score = 50
    
    # 4. Extract Key Nouns (What is broken?)
    # e.g., "The kitchen boiler is broken" -> ["kitchen", "boiler"]
    keywords = [chunk.text for chunk in doc.noun_chunks]

    return {
        "urgency": urgency,
        "score": score,
        "keywords": keywords,
        "analysis": f"Detected {urgency} priority based on keywords: {tokens}"
    }

@app.get("/")
def health_check():
    return {"status": "AI Service is Online"}