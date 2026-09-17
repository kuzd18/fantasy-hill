import type { LeagueFormat } from "./types";

export const LEAGUE_FORMATS: Record<"A" | "B", LeagueFormat> = {
  A: {
    id: "A",
    name: "Format A — 12 teams",
    teamCount: 12,
    description:
      "Deep benches: 2 Senators, 3 Reps, Senate & House leadership, governors, both chambers of state legislatures, and a cabinet seat.",
    slots: [
      { key: "sen1", label: "Senator", categories: ["senator"] },
      { key: "sen2", label: "Senator", categories: ["senator"] },
      {
        key: "rep1",
        label: "Representative",
        categories: ["representative"],
      },
      {
        key: "rep2",
        label: "Representative",
        categories: ["representative"],
      },
      {
        key: "rep3",
        label: "Representative",
        categories: ["representative"],
      },
      {
        key: "sen_lead",
        label: "Senate Leadership",
        categories: ["senate_leadership"],
      },
      {
        key: "house_lead",
        label: "House Leadership",
        categories: ["house_leadership"],
      },
      { key: "gov1", label: "Governor", categories: ["governor"] },
      { key: "gov2", label: "Governor", categories: ["governor"] },
      {
        key: "state_upper",
        label: "State Upper Chamber",
        categories: ["state_upper"],
      },
      {
        key: "state_lower",
        label: "State Lower Chamber",
        categories: ["state_lower"],
      },
      {
        key: "cabinet",
        label: "Cabinet / Agency",
        categories: ["cabinet_agency"],
      },
    ],
  },
  B: {
    id: "B",
    name: "Format B — 18 teams",
    teamCount: 18,
    description:
      "Wider field: 1 Senator, 2 Reps, one federal leadership slot, governors, a state legislator, and a cabinet seat.",
    slots: [
      { key: "sen1", label: "Senator", categories: ["senator"] },
      {
        key: "rep1",
        label: "Representative",
        categories: ["representative"],
      },
      {
        key: "rep2",
        label: "Representative",
        categories: ["representative"],
      },
      {
        key: "fed_lead",
        label: "Federal Leadership",
        categories: [
          "federal_leadership",
          "senate_leadership",
          "house_leadership",
        ],
      },
      { key: "gov1", label: "Governor", categories: ["governor"] },
      { key: "gov2", label: "Governor", categories: ["governor"] },
      {
        key: "state_leg",
        label: "State Legislator",
        categories: ["state_legislator", "state_upper", "state_lower"],
      },
      {
        key: "cabinet",
        label: "Cabinet / Agency",
        categories: ["cabinet_agency"],
      },
    ],
  },
};

export function getFormat(id: "A" | "B"): LeagueFormat {
  return LEAGUE_FORMATS[id];
}
