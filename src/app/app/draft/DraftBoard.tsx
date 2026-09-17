"use client";

import { useMemo, useState } from "react";
import { PoliticianCard } from "@/components/PoliticianCard";
import {
  createDemoLeague,
  teamRosterPoliticianIds,
} from "@/lib/demo-league";
import { getFormat } from "@/lib/formats";
import { POLITICIANS } from "@/lib/politicians";
import type { DraftPick, League } from "@/lib/types";

function nextOpenPick(league: League): DraftPick | undefined {
  return league.picks.find((p) => !p.politicianId);
}

export function DraftBoard() {
  const [league, setLeague] = useState(() => createDemoLeague("A"));
  const format = getFormat(league.formatId);
  const onClock = nextOpenPick(league);
  const onClockTeam = league.teams.find((t) => t.id === onClock?.teamId);

  const draftedIds = useMemo(
    () =>
      new Set(
        league.picks
          .filter((p) => p.politicianId)
          .map((p) => p.politicianId as string),
      ),
    [league.picks],
  );

  const available = POLITICIANS.filter((p) => !draftedIds.has(p.id));

  function draftPolitician(politicianId: string) {
    if (!onClock) return;
    setLeague((prev) => ({
      ...prev,
      picks: prev.picks.map((pick) =>
        pick.pick === onClock.pick && !pick.politicianId
          ? { ...pick, politicianId }
          : pick,
      ),
    }));
  }

  const recent = [...league.picks]
    .filter((p) => p.politicianId)
    .slice(-8)
    .reverse();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
            Draft board
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-50 tracking-tight">
            {league.name}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Snake draft · Format {league.formatId} · {format.slots.length}{" "}
            rounds · DEMO DATA
          </p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 min-w-[200px]">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            On the clock
          </p>
          {onClock && onClockTeam ? (
            <>
              <p className="mt-1 font-semibold text-slate-50">
                {onClockTeam.name}
              </p>
              <p className="text-xs font-mono text-emerald-400 mt-0.5">
                Round {onClock.round} · Pick {onClock.pick}
              </p>
            </>
          ) : (
            <p className="mt-1 font-semibold text-emerald-300">Draft complete</p>
          )}
        </div>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">
          Recent picks
        </h2>
        <ul className="flex flex-wrap gap-2">
          {recent.length === 0 && (
            <li className="text-sm text-slate-500">No picks yet.</li>
          )}
          {recent.map((pick) => {
            const pol = POLITICIANS.find((p) => p.id === pick.politicianId);
            const team = league.teams.find((t) => t.id === pick.teamId);
            return (
              <li
                key={`${pick.pick}-${pick.politicianId}`}
                className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300"
              >
                <span className="font-mono text-slate-500">#{pick.pick}</span>{" "}
                {pol?.name ?? "—"}{" "}
                <span className="text-slate-500">→ {team?.name}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="text-sm font-semibold text-slate-300">
            Available pool ({available.length})
          </h2>
          <p className="text-xs text-slate-500">
            Your demo team: {league.teams[0]?.name} (
            {teamRosterPoliticianIds(league, league.teams[0]?.id ?? "").length}{" "}
            drafted)
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {available.map((p) => (
            <PoliticianCard
              key={p.id}
              politician={p}
              drafted={false}
              onDraft={
                onClock ? () => draftPolitician(p.id) : undefined
              }
            />
          ))}
        </div>
        {available.length === 0 && (
          <p className="text-sm text-slate-500">Pool exhausted.</p>
        )}
      </section>
    </div>
  );
}
