# AI Service — Nexus NLP Engine

> FastAPI · Python 3.11 · spaCy · Rule-Based Classification

---

## Overview

The AI service is a **standalone NLP microservice** that analyses tenant issue descriptions and returns structured classifications. It currently uses a **rule-based approach** (keyword dictionaries + spaCy tokenisation) — designed to be fully explainable and auditable, with a clear evolution path toward ML-based models as training data accumulates.

> See [AI Roadmap](../docs/ai-roadmap.md) for the full evolution plan.

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Python | 3.11+ | Runtime |
| FastAPI | 0.129.0 | Async web framework |
| Uvicorn | 0.40.0 | ASGI server |
| spaCy | 3.8.11 | NLP tokenisation & lemmatisation |
| Pydantic | 2.12.5 | Request/response validation |
| en_core_web_sm | 3.x | English language model |

---

## API

### `POST /analyze`

Analyses a text description and returns urgency, category, confidence, score, recommended action, and AI reasoning.

**Request:**
```json
{
  "text": "My kitchen sink is leaking badly and water is all over the floor"
}
```

**Response:**
```json
{
  "urgency": "HIGH",
  "category": "PLUMBING",
  "confidence": 0.67,
  "score": 100,
  "recommended_action": "Dispatch emergency plumber immediately",
  "explanation": [
    "Detected HIGH urgency keywords: leak",
    "Detected PLUMBING category keywords: leak, water",
    "Confidence: 67% (4 matched keywords out of 6 tokens)"
  ]
}
```


### `GET /analyze-iot` (Planned)

Analyses IoT sensor data for risk prediction (e.g., Mould).

**Request:**
```json
{
 "propertyId": 12,
 "temperature": 32,
 "humidity": 85,
 "timestamp": "2024-03-20T10:00:00Z"
}
```

**Response:**
```json
{
 "riskLevel": "HIGH",
 "issue": "Possible mould growth",
 "action": "Inspect ventilation"
}
```

### `GET /`

Health check endpoint.

```json
{ "status": "AI Service is Online" }
```

---

## NLP Pipeline

```
Input Text
    │
    ▼
┌─────────────────────┐
│  spaCy Processing   │  nlp(text.lower())
│  ├─ Tokenisation    │  Split into word tokens
│  ├─ Lemmatisation   │  "leaking" → "leak"
│  └─ Noun Chunks     │  Extract noun phrases
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Urgency Detection  │  Match tokens against urgency dictionary
│  HIGH → MEDIUM → LOW│  First match wins (priority order)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Category Detection │  Count matches per category
│  Multi-label scoring│  Highest match count wins
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Confidence Scoring │  unique_matched / total_tokens
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Action Engine      │  (urgency, category) → recommended action
│  Lookup table       │  Fallback: "Manual review required"
└─────────────────────┘
```

---

## Project Structure

```
ai-service/
├── main.py                  # FastAPI app entry point, lifespan, CORS
├── requirements.txt         # Python dependencies
├── core/
│   ├── config.py            # Loads spaCy model + keyword dictionaries
│   └── loggin.py            # Logger setup
├── models/
│   └── schemas.py           # Pydantic request/response models
├── routes/
│   └── analyze.py           # POST /analyze endpoint handler
└── services/
    ├── nlp_engine.py        # spaCy tokenisation + lemmatisation
    ├── classifier.py        # Urgency, category, confidence scoring
    └── action_engine.py     # (urgency, category) → action lookup
```

---

## Configuration

All NLP dictionaries are configured in `core/config.py` and loaded once at startup via FastAPI's lifespan context:

| Config | Description |
|--------|-------------|
| `URGENCY_KEYWORDS` | HIGH / MEDIUM / LOW keyword lists |
| `CATEGORY_KEYWORDS` | PLUMBING / ELECTRICAL / STRUCTURAL / HEATING keywords |
| `ACTIONS` | (urgency, category) → recommended action mapping |
| `nlp` | spaCy `en_core_web_sm` model instance |

---

## Running Locally

```bash
# Prerequisites: Python 3.11+

# 1. Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run (auto-downloads spaCy model on first start)
uvicorn main:app --reload --port 8000

# Service available at http://localhost:8000
# Docs at http://localhost:8000/docs (Swagger UI)
```

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Rule-based first** | Fully explainable, zero training data needed, establishes a performance baseline for future ML models |
| **spaCy for NLP** | Production-grade tokeniser with lemmatisation; same library will power ML pipeline |
| **Separate microservice** | Python ecosystem for NLP/ML; independent scaling from Java backend |
| **FastAPI** | Async-ready, auto-generated OpenAPI docs, Pydantic validation |
| **Lifespan loading** | spaCy model loaded once at startup, shared across all requests (no per-request loading) |

---

## 🧪 Testing Strategy

- **Framework:** PyTest
- **Unit Testing:** Individual components (`classifier.py`, `nlp_engine.py`) are tested against edge cases (e.g. spelling errors, empty strings, missing keywords).
- **Endpoint Testing:** `TestClient` from FastAPI is used to hit `/analyze` and assert the schema of the JSON response, verifying HTTP 200 codes and correct Pydantic validation on malformed requests.
- **Model Regression (Phase 3):** When ML models are introduced, testing will include a dedicated regression suite asserting F1-scores against a golden dataset of 5,000 historical tickets.

---

## 🚀 Evolution Path

| Phase | Core Theme | Enhancement |
|-------|------------|------------|
| **Phase 2** | **Expansion** | Synonym expansion (WordNet), negation handling ("no heat" != "fixed heat"), expanded categories. |
| **Phase 3** | **Intelligence**| ML classifier (HuggingFace/DistilBERT) replacing rules, multi-lingual support, A/B testing pipeline. |
| **Phase 4** | **IoT & Scale** | IoT sensor anomaly detection (timeseries forecasting), predictive maintenance models. |
