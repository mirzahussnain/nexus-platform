from fastapi import APIRouter, Request
from models.schemas import TicketText, AIResponse
from services.nlp_engine import process_text
from services.classifier import detect_urgency, detect_category, calculate_confidence
from services.action_engine import recommend_action


router= APIRouter()



@router.post("/analyze", response_model=AIResponse)
async def analyze(request: Request, ticket: TicketText):

    config = request.app.state.config
    logger = request.app.state.logger

    tokens, nouns = process_text(config["nlp"], ticket.description)

    urgency, score, urgency_terms = detect_urgency(
        tokens,
        config["URGENCY_KEYWORDS"]
    )

    category, category_terms = detect_category(
        tokens,
        config["CATEGORY_KEYWORDS"]
    )

    confidence = calculate_confidence(
        urgency_terms + category_terms,
        len(tokens)
    )

    action = recommend_action(
        urgency,
        category,
        config["ACTIONS"]
    )

    explanation = [
        f"Detected urgency words: {urgency_terms}",
        f"Detected category words: {category_terms}",
        f"Classified as {urgency} priority"
    ]

    logger.info(f"Processed ticket | urgency={urgency} category={category}")

    return {
        "urgency": urgency,
        "score": score,
        "category": category,
        "confidence": confidence,
        "recommended_action": action,
        "explanation": explanation
    }