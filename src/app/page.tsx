import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { POLITICIANS } from "@/lib/politicians";
import { LEAGUE_FORMATS } from "@/lib/formats";

export default function HomePage() {
  const sample = POLITICIANS.slice(0, 6);

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/90 mb-4">
            Faceless civic fantasy
          </p>
          <h1 className="max-w-2xl text-4xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-tight">
            Fantasy football for political nerds.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-400 leading-relaxed">
            Draft senators, reps, governors, and cabinet seats. Score markup,
            cloture, and floor action — without the celebrity circus. Demo
            preview with sample data.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/app"
              className="rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Open demo dashboard
            </Link>
            <Link
              href="/app/create"
              className="rounded-lg border border-slate-600 px-5 py-2.5 font-semibold text-slate-200 hover:bg-slate-900 transition-colors"
            >
              Create a league
            </Link>
          </div>
          <div className="mt-10 relative">
            <p className="text-sm text-slate-500 mb-2">Join the waitlist</p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-xl font-semibold text-slate-100 mb-2">
          How it works
        </h2>
        <p className="text-slate-500 text-sm mb-8 max-w-2xl">
          Pick a format, snake-draft officeholders, then watch demo points
          stack from legislative activity.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Create a league",
              body: "Format A (12 teams, deep benches) or Format B (18 teams, wider field).",
            },
            {
              step: "02",
              title: "Run the draft",
              body: "Snake draft politicians into roster slots — senators through cabinet.",
            },
            {
              step: "03",
              title: "Track the board",
              body: "Rosters and scoreboard update from demo scoring periods.",
            },
          ].map((card) => (
            <div
              key={card.step}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <span className="font-mono text-xs text-emerald-400">
                {card.step}
              </span>
              <h3 className="mt-2 font-semibold text-slate-50">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">
                League formats
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Two roster shapes — no President, VP, or SCOTUS.
              </p>
            </div>
            <Link
              href="/app/create"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Set up demo league →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.values(LEAGUE_FORMATS).map((fmt) => (
              <div
                key={fmt.id}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-5"
              >
                <h3 className="font-semibold text-slate-50">{fmt.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{fmt.description}</p>
                <p className="mt-3 text-xs text-slate-500 font-mono">
                  {fmt.teamCount} teams · {fmt.slots.length} roster slots
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-xl font-semibold text-slate-100 mb-2">
          Sample pool
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          DEMO DATA — illustrative names &amp; points for UX preview.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sample.map((p) => (
            <li
              key={p.id}
              className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-3 flex justify-between gap-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-100">{p.name}</p>
                <p className="text-xs text-slate-500">
                  {p.title} · {p.state}
                </p>
              </div>
              <span className="font-mono text-sm text-emerald-400 shrink-0">
                {p.demoPoints}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-600">
        Fantasy Hill · product preview · DEMO DATA only
      </footer>
    </main>
  );
}
