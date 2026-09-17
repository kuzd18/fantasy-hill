import {
  createDemoLeague,
  teamRosterPoliticianIds,
  teamTotalPoints,
} from "@/lib/demo-league";
import { getFormat } from "@/lib/formats";
import { getPolitician, CATEGORY_LABELS } from "@/lib/politicians";
import { PartyBadge } from "@/components/PartyBadge";

export default function RosterPage() {
  const league = createDemoLeague("A");
  const format = getFormat(league.formatId);

  return (
    <main className="mx-auto max-w-6xl w-full px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
        Rosters
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-50 tracking-tight">
        {league.name}
      </h1>
      <p className="mt-2 text-sm text-slate-400 max-w-2xl">
        Seeded snake-draft results (first two rounds pre-filled). DEMO DATA —
        not live scoring.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {league.teams.map((team) => {
          const ids = teamRosterPoliticianIds(league, team.id);
          const points = teamTotalPoints(league, team.id);
          return (
            <section
              key={team.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden"
            >
              <header className="flex items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
                <div>
                  <h2 className="font-semibold text-slate-50">{team.name}</h2>
                  <p className="text-xs text-slate-500">{team.owner}</p>
                </div>
                <span className="font-mono text-sm text-emerald-400">
                  {points} pts
                </span>
              </header>
              <ul className="divide-y divide-slate-800/80">
                {format.slots.map((slot, idx) => {
                  const polId = ids[idx];
                  const pol = polId ? getPolitician(polId) : undefined;
                  return (
                    <li
                      key={`${team.id}-${slot.key}`}
                      className="flex items-start justify-between gap-3 px-4 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">
                          {slot.label}
                        </p>
                        {pol ? (
                          <>
                            <p className="text-sm font-medium text-slate-100 truncate flex items-center gap-2">
                              {pol.name}
                              <PartyBadge party={pol.party} />
                            </p>
                            <p className="text-xs text-slate-500">
                              {CATEGORY_LABELS[pol.category]} · {pol.state} ·{" "}
                              {pol.lastAction}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-slate-600 italic">
                            Empty slot
                          </p>
                        )}
                      </div>
                      {pol && (
                        <span className="font-mono text-xs text-emerald-400 shrink-0">
                          {pol.demoPoints}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
