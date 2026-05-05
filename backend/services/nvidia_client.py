import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url=os.getenv("NVIDIA_BASE_URL"),
    api_key=os.getenv("NVIDIA_API_KEY"),
)

MODEL = os.getenv("NVIDIA_MODEL", "meta/llama3-70b-instruct")


def analyze_conversation(text: str, context_type: str) -> dict:
    prompt = f"""
Tu es TrustLens AI, un assistant d'analyse de cohérence conversationnelle.

IMPORTANT :
- Tu ne dois jamais dire qu'une personne ment.
- Tu analyses uniquement la cohérence, les ambiguïtés, les émotions et les points à clarifier.
- Réponds uniquement en JSON valide.

Type de contexte : {context_type}

Texte à analyser :
{text}

Retourne exactement ce format JSON :
{{
  "coherence_score": 0,
  "dominant_emotions": ["emotion1", "emotion2"],
  "summary": "résumé neutre",
  "issues": [
    {{
      "title": "titre du point",
      "explanation": "explication claire",
      "severity": "low|medium|high"
    }}
  ],
  "suggested_questions": ["question 1", "question 2"],
  "final_advice": "conseil final neutre"
}}
"""

    completion = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "Tu réponds uniquement en JSON valide, sans markdown.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=1200,
    )

    content = completion.choices[0].message.content

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "coherence_score": 50,
            "dominant_emotions": ["indéterminé"],
            "summary": "L'analyse a été générée mais le format JSON était invalide.",
            "issues": [
                {
                    "title": "Format de réponse invalide",
                    "explanation": content,
                    "severity": "medium",
                }
            ],
            "suggested_questions": [
                "Peux-tu reformuler les points principaux ?"
            ],
            "final_advice": "Relancer l’analyse avec un texte plus clair.",
        }