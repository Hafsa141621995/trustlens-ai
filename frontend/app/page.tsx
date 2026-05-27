export default function Home() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">TrustLens AI</div>
          <a
            href="/analyze"
            className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Commencer
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Analyse conversationnelle assistée par IA
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
              Comprendre ce qui se cache derrière une conversation.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              TrustLens AI analyse les incohérences, ambiguïtés, émotions et
              points à clarifier dans un échange texte. Sans accuser. Sans
              juger. Juste une lecture structurée.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/analyze"
                className="rounded-full bg-cyan-400 px-7 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
              >
                Lancer une analyse
              </a>
              <a
                href="#features"
                className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white/80 hover:bg-white/10"
              >
                Voir les capacités
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <div className="rounded-2xl bg-black/40 p-5">
              <p className="text-sm text-white/50">Insight détecté</p>
              <h2 className="mt-3 text-2xl font-semibold">
                Changement de version repéré
              </h2>
              <p className="mt-4 text-white/60">
                Le discours contient plusieurs formulations contradictoires sur
                la disponibilité et la chronologie des événements.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-white/10 p-4">
                  Score de cohérence : <span className="font-bold">62%</span>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  Ton dominant : incertain, défensif
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  Action suggérée : demander une clarification précise
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="grid gap-4 pb-16 md:grid-cols-3">
          {[
            ["Incohérences", "Repère les contradictions ou changements de version."],
            ["Émotions", "Analyse les signaux émotionnels dominants du texte."],
            ["Questions utiles", "Propose quoi demander pour clarifier la situation."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-white/60">{desc}</p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}