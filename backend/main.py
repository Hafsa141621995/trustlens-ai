from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas.analysis_schema import AnalysisRequest, AnalysisResponse
from services.nvidia_client import analyze_conversation

app = FastAPI(
    title="TrustLens AI API",
    description="API d'analyse de cohérence conversationnelle avec IA générative.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # on sécurisera plus tard
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "app": "TrustLens AI",
        "status": "running",
        "docs": "/docs"
    }
    
@app.get("/health")
def health():
    return {"status": "ok", "message": "TrustLens AI backend is running"}


@app.post("/analyze", response_model=AnalysisResponse)
def analyze(request: AnalysisRequest):
    try:
        result = analyze_conversation(
            text=request.text,
            context_type=request.context_type,
        )
        return result
    except Exception as e:
        print("ERROR ANALYZE:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))