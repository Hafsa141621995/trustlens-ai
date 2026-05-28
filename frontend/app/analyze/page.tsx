"use client";

import { useState } from "react";

type Issue = {
  title: string;
  explanation: string;
  severity: "low" | "medium" | "high";
};

type AnalysisResult = {
  coherence_score: number;
  dominant_emotions: string[];
  summary: string;
  issues: Issue[];
  suggested_questions: string[];
  final_advice: string;
};

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    try {
      setLoading(true);
      setResult(null);

      const response = await fetch("https://trustlens-ai-fezu.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          context_type: "conversation",
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur API");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'analyse.");
    } finally {
      setLoading(false);
    }
  }

  const scoreColor =
    result && result.coherence_score < 40
      ? "text-red-400"
      : result && result.coherence_score < 70
      ? "text-orange-300"
      : "text-green-300";

  return (
    <main className="min-h-screen bg-[#070A12] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm text-cyan-300 hover:underline">
          ← Retour
        </a>

        <h1 className="mt-10 text-5xl font-bold">Analyse conversationnelle</h1>

        <p className="mt-4 text-white/60">
          Collez une conversation. TrustLens AI détecte les incohérences,
          émotions dominantes et questions à clarifier.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <label className="text-sm text-white/70">Texte à analyser</label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-4 min-h-72 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-cyan-400"
            placeholder="Collez votre conversation ici..."
          />

          <button
            onClick={handleAnalyze}
            disabled={loading || text.length < 20}
            className="mt-5 rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyse en cours..." : "Analyser"}
          </button>
        </div>

        {result && (
          <section className="mt-10 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm text-white/50">Score de cohérence</p>
              <p className={`mt-2 text-6xl font-bold ${scoreColor}`}>
                {result.coherence_score}%
              </p>
              <p className="mt-4 text-white/65">{result.summary}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold">Émotions dominantes</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {result.dominant_emotions.map((emotion) => (
                  <span
                    key={emotion}
                    className="rounded-full bg-cyan-400/10 px-4 py-2 text-cyan-200"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {result.issues.map((issue, index) => {
                const border =
                  issue.severity === "high"
                    ? "border-red-400/40 bg-red-400/10"
                    : issue.severity === "medium"
                    ? "border-orange-300/40 bg-orange-300/10"
                    : "border-green-300/40 bg-green-300/10";

                return (
                  <div
                    key={index}
                    className={`rounded-3xl border p-6 ${border}`}
                  >
                    <p className="text-sm uppercase text-white/50">
                      Niveau : {issue.severity}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold">
                      {issue.title}
                    </h3>
                    <p className="mt-3 text-white/65">{issue.explanation}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold">Questions à poser</h2>
              <ul className="mt-4 space-y-3">
                {result.suggested_questions.map((q, index) => (
                  <li
                    key={index}
                    className="rounded-2xl bg-black/30 p-4 text-white/75"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-6">
              <h2 className="text-2xl font-semibold text-cyan-100">
                Conseil final
              </h2>
              <p className="mt-3 text-cyan-50/80">{result.final_advice}</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}