import Link from "next/link";
import {
  createDemoLeague,
  teamRosterPoliticianIds,
  teamTotalPoints,
} from "@/lib/demo-league";
import { getPolitician } from "@/lib/politicians";

export default function ScoreboardPage() {
  const league = createDemoLeague("A");
  const standings = [...league.teams]
    .map((team) => {
      const ids = teamRosterPoliticianIds(league, team.id);
      const roster = ids
        .map((id) => getPolitician(id))
        .filter(Boolean);
      return {
        ...team,
        points: teamTotalPoints(league, team.id),
        rosterSize: ids.length,
        topScorer: [...roster].sort(
          (a, b) => (b?.demoPoints ?? 0) - (a?.demoPoints ?? 0),
        )[0],
      };
    })
    .sort((a, b) => b.points - a.points);

  const maxPoints = standings[0]?.points ?? 1;

  return (
    <main className="mx-auto max-w-4xl w-full px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
        Scoreboard
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-50 tracking-tight">
        {league.name}
      </h1>
      <p className="mt-2 text-sm text-slate-400 max-w-2xl">
        Rankings from demo fantasy points on drafted politicians. DEMO DATA —
        illustrative scoring period only.
      </p>

      <div className="mt-8 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium w-12">#</th>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">
                Top scorer
              </th>
              <th className="px-4 py-3 font-medium text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {standings.map((row, i) => (
              <tr key={row.id} className="bg-slate-950/40">
                <td className="px-4 py-3 font-mono text-slate-500">{i + 1}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-100">{row.name}</p>
                  <p className="text-xs text-slate-500">
                    {row.owner} · {row.rosterSize} drafted
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-800 max-w-xs overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500/80"
                      style={{
                        width: `${Math.max(4, (row.points / maxPoints) * 100)}%`,
                      }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-slate-400">
                  {row.topScorer ? (
                    <>
                      {row.topScorer.name}{" "}
                      <span className="font-mono text-emerald-400/80">
                        ({row.topScorer.demoPoints})
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-emerald-400">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        See full rosters on the{" "}
        <Link href="/app/roster" className="text-emerald-400 hover:text-emerald-300">
          roster page
        </Link>
        .
      </p>
    </main>
  );
}
