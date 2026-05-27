import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")
NVIDIA_BASE_URL = os.getenv("NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1")
MODEL = os.getenv("NVIDIA_MODEL", "meta/llama-3.1-8b-instruct")

client = OpenAI(
    base_url=NVIDIA_BASE_URL,
    api_key=NVIDIA_API_KEY,
)


def analyze_conversation(text: str, context_type: str) -> dict:
    if not NVIDIA_API_KEY:
        raise ValueError("NVIDIA_API_KEY manquante dans le fichier .env")

    prompt = f"""
Tu es TrustLens AI, un assistant d'analyse de cohérence conversationnelle.

Règles :
- Ne dis jamais qu'une personne ment.
- Analyse seulement la cohérence, les ambiguïtés, les émotions et les points à clarifier.
- Réponds uniquement en JSON valide.
- Pas de markdown.
- Le score doit être entre 0 et 100.

Type de contexte : {context_type}

Texte :
{text}

Format JSON obligatoire :
{{
  "coherence_score": 0,
  "dominant_emotions": ["emotion1", "emotion2"],
  "summary": "résumé neutre",
  "issues": [
    {{
      "title": "titre du point",
      "explanation": "explication claire",
      "severity": "low"
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
        temperature=0.2,
        max_tokens=900,
    )

    content = completion.choices[0].message.content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "").replace("```", "").strip()

    return json.loads(content)