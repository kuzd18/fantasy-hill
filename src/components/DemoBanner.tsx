import { DEMO_BANNER } from "@/lib/politicians";

export function DemoBanner() {
  return (
    <div className="w-full bg-amber-500/15 border-b border-amber-500/40 text-amber-100 text-center text-xs sm:text-sm px-3 py-2 font-medium tracking-wide">
      {DEMO_BANNER}
    </div>
  );
}
