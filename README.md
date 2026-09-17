# Fantasy Hill

Faceless web product — fantasy football for political nerds.

Draft senators, representatives, governors, leadership, and cabinet seats. Score legislative action. This repo is a **demo preview** with seed data (not live scoring).

## Stack

- Next.js App Router
- TypeScript + Tailwind CSS
- Demo league seed in `src/lib/`

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing + waitlist |
| `/app` | Demo dashboard |
| `/app/create` | Create league (Format A/B) |
| `/app/draft` | Interactive snake draft board |
| `/app/roster` | Team rosters from seed picks |
| `/app/scoreboard` | Standings by demo points |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

## Demo data

All politicians and scores are illustrative. Banners mark **DEMO DATA** throughout the UI. President, Vice President, and Supreme Court are excluded from the pool.
