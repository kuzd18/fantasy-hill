import type { Party } from "@/lib/types";

const styles: Record<Party, string> = {
  D: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  R: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  I: "bg-violet-500/20 text-violet-300 border-violet-500/40",
};

export function PartyBadge({ party }: { party: Party }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[party]}`}
    >
      {party}
    </span>
  );
}
