import type { Politician } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/politicians";
import { PartyBadge } from "./PartyBadge";

export function PoliticianCard({
  politician,
  drafted,
  onDraft,
}: {
  politician: Politician;
  drafted?: boolean;
  onDraft?: () => void;
}) {
  return (
    <article
      className={`rounded-xl border p-3 flex flex-col gap-2 transition-colors ${
        drafted
          ? "border-slate-700 bg-slate-900/40 opacity-60"
          : "border-slate-700/80 bg-slate-900/80 hover:border-emerald-500/50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-50 text-sm leading-snug">
            {politician.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {politician.title} · {politician.state}
          </p>
        </div>
        <PartyBadge party={politician.party} />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">
          {CATEGORY_LABELS[politician.category]}
        </span>
        <span className="font-mono font-semibold text-emerald-400">
          {politician.demoPoints} pts
        </span>
      </div>
      <p className="text-[11px] text-slate-500 line-clamp-2">
        {politician.lastAction}
      </p>
      {onDraft && (
        <button
          type="button"
          disabled={drafted}
          onClick={onDraft}
          className="mt-1 rounded-md bg-emerald-500/90 px-2 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          {drafted ? "Drafted" : "Draft"}
        </button>
      )}
    </article>
  );
}
