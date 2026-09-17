"use client";

import { useState } from "react";
import Link from "next/link";
import { LEAGUE_FORMATS } from "@/lib/formats";
import type { LeagueFormatId } from "@/lib/types";

export default function CreateLeaguePage() {
  const [formatId, setFormatId] = useState<LeagueFormatId>("A");
  const [leagueName, setLeagueName] = useState("Capitol Classic");
  const [created, setCreated] = useState(false);
  const format = LEAGUE_FORMATS[formatId];

  function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreated(true);
  }

  return (
    <main className="mx-auto max-w-3xl w-full px-4 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400/90">
        Create league
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-50 tracking-tight">
        Start a fantasy league
      </h1>
      <p className="mt-2 text-sm text-slate-400 max-w-xl">
        DEMO DATA — this preview does not persist leagues. Choose a format and
        jump into the seeded draft experience.
      </p>

      <form
        onSubmit={onCreate}
        className="mt-8 space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
      >
        <div>
          <label
            htmlFor="league-name"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            League name
          </label>
          <input
            id="league-name"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-300 mb-3">
            Format
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(LEAGUE_FORMATS) as LeagueFormatId[]).map((id) => {
              const f = LEAGUE_FORMATS[id];
              const selected = formatId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setFormatId(id);
                    setLeagueName(
                      id === "A" ? "Capitol Classic" : "Wide Field",
                    );
                    setCreated(false);
                  }}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    selected
                      ? "border-emerald-500/60 bg-emerald-500/10"
                      : "border-slate-700 bg-slate-950/60 hover:border-slate-500"
                  }`}
                >
                  <p className="font-semibold text-slate-50">{f.name}</p>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-slate-500">
                    {f.teamCount} teams · {f.slots.length} slots
                  </p>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
            Roster slots
          </p>
          <ul className="flex flex-wrap gap-2">
            {format.slots.map((slot) => (
              <li
                key={slot.key}
                className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300"
              >
                {slot.label}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto rounded-lg bg-emerald-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Create demo league
        </button>
      </form>

      {created && (
        <div
          className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5"
          role="status"
        >
          <p className="font-semibold text-emerald-200">
            “{leagueName}” ready (demo)
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Format {formatId} · {format.teamCount} teams. Continue to the draft
            board — seeded Capitol Classic demo data loads there.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/app/draft"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Open draft board
            </Link>
            <Link
              href="/app"
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
