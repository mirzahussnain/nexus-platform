from pydantic import BaseModel
from typing import List
class TicketText(BaseModel):
    description: str


class AIResponse(BaseModel):
    urgency: str
    score: int
    category: str
    confidence: float
    recommended_action: str
    keywords: List[str]
    matched_terms: List[str]
    explanation: List[str]
