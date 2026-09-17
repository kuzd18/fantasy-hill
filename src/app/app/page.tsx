import Link from "next/link";
import {
  createDemoLeague,
  teamTotalPoints,
} from "@/lib/demo-league";
import { getFormat } from "@/lib/formats";
import { POLITICIANS } from "@/lib/politicians";

export default function DashboardPage() {
  const league = createDemoLeague("A");
  const format = getFormat(league.formatId);
  const standings = [...league.teams]
    .map((t) => ({
      ...t,
      points: teamTotalPoints(league, t.id),
    }))
    .sort((a, b) => b.points - a.points);
  const drafted = league.picks.filter((p) => p.politicianId).length;
  const openPicks = league.picks.filter((p) => !p.politicianId).length;

  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
          Demo dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-50 tracking-tight">
          {league.name}
        </h1>
        <p className="mt-2 text-slate-400 text-sm max-w-2xl">
          Seeded Format {league.formatId} league with sample snake-draft picks.
          Explore draft, roster, and scoreboard — all DEMO DATA.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          { label: "Teams", value: String(league.teams.length) },
          { label: "Roster slots", value: String(format.slots.length) },
          { label: "Picks filled", value: String(drafted) },
          { label: "Open picks", value: String(openPicks) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-semibold font-mono text-emerald-400">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          {
            href: "/app/create",
            title: "Create league",
            desc: "Pick Format A or B and start a demo.",
          },
          {
            href: "/app/draft",
            title: "Draft board",
            desc: "Continue the snake draft with the pool.",
          },
          {
            href: "/app/roster",
            title: "Rosters",
            desc: "See who each team drafted.",
          },
          {
            href: "/app/scoreboard",
            title: "Scoreboard",
            desc: "Rank teams by demo points.",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/40 transition-colors"
          >
            <h2 className="font-semibold text-slate-50">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{card.desc}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold text-slate-100 mb-3">
            Early standings
          </h2>
          <ol className="rounded-xl border border-slate-800 divide-y divide-slate-800 overflow-hidden">
            {standings.slice(0, 6).map((t, i) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-3 bg-slate-900/40 px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-slate-500 w-5">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.owner}</p>
                  </div>
                </div>
                <span className="font-mono text-sm text-emerald-400 shrink-0">
                  {t.points} pts
                </span>
              </li>
            ))}
          </ol>
          <Link
            href="/app/scoreboard"
            className="inline-block mt-3 text-sm text-emerald-400 hover:text-emerald-300"
          >
            Full scoreboard →
          </Link>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-100 mb-3">
            Pool snapshot
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            {POLITICIANS.length} politicians in the demo pool.
          </p>
          <ul className="rounded-xl border border-slate-800 divide-y divide-slate-800 overflow-hidden">
            {POLITICIANS.slice(0, 6).map((p) => (
              <li
                key={p.id}
                className="flex justify-between gap-3 bg-slate-900/40 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-100">{p.name}</p>
                  <p className="text-xs text-slate-500">
                    {p.title} · {p.state}
                  </p>
                </div>
                <span className="font-mono text-sm text-emerald-400">
                  {p.demoPoints}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
