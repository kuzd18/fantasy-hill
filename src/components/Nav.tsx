import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/app", label: "Dashboard" },
  { href: "/app/create", label: "Create League" },
  { href: "/app/draft", label: "Draft Board" },
  { href: "/app/roster", label: "Roster" },
  { href: "/app/scoreboard", label: "Scoreboard" },
];

export function Nav() {
  return (
    <header className="border-b border-slate-700/80 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-slate-950 font-black text-sm">
            FH
          </span>
          <span className="font-semibold text-slate-50 tracking-tight group-hover:text-emerald-300 transition-colors">
            Fantasy Hill
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 sm:gap-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-1.5 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
