from pydantic import BaseModel, Field
from typing import List


class AnalysisRequest(BaseModel):
    text: str = Field(..., min_length=20)
    context_type: str = "conversation"


class Issue(BaseModel):
    title: str
    explanation: str
    severity: str


class AnalysisResponse(BaseModel):
    coherence_score: int
    dominant_emotions: List[str]
    summary: str
    issues: List[Issue]
    suggested_questions: List[str]
    final_advice: str