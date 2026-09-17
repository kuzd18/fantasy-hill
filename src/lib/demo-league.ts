import type { DraftPick, League, LeagueTeam } from "./types";
import { getFormat } from "./formats";
import { POLITICIANS } from "./politicians";

const TEAM_NAMES_A = [
  "Cloture Cats",
  "Whip Counts",
  "Floor Managers",
  "Markup Mavens",
  "Rules Committee",
  "Conference Room",
  "Discharge Petitioners",
  "Appropriators",
  "Oversight Owls",
  "Caucus Crushers",
  "Veto Override",
  "Quorum Callers",
];

const TEAM_NAMES_B = [
  ...TEAM_NAMES_A,
  "Blue Slips",
  "Germane Gang",
  "Filibuster Foxes",
  "Unanimous Consent",
  "Holds & Holds",
  "Motion to Table",
];

function makeTeams(count: number, names: string[]): LeagueTeam[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `team-${i + 1}`,
    name: names[i] ?? `Team ${i + 1}`,
    owner: `Manager ${i + 1}`,
  }));
}

/** Snake draft order for demo: pre-fill early rounds with sample picks */
function buildDemoPicks(
  teams: LeagueTeam[],
  slotCount: number,
): DraftPick[] {
  const picks: DraftPick[] = [];
  const available = [...POLITICIANS];
  let pickIndex = 0;

  for (let round = 1; round <= slotCount; round++) {
    const order =
      round % 2 === 1 ? [...teams] : [...teams].reverse();
    for (const team of order) {
      pickIndex += 1;
      // Pre-draft first 2 full rounds for demo scoreboard/roster richness
      const assign = round <= 2 && available.length > 0;
      const politician = assign ? available.shift()! : null;
      picks.push({
        round,
        pick: pickIndex,
        teamId: team.id,
        politicianId: politician?.id ?? null,
      });
    }
  }
  return picks;
}

export function createDemoLeague(formatId: "A" | "B" = "A"): League {
  const format = getFormat(formatId);
  const names = formatId === "A" ? TEAM_NAMES_A : TEAM_NAMES_B;
  const teams = makeTeams(format.teamCount, names);
  const picks = buildDemoPicks(teams, format.slots.length);
  return {
    id: `demo-${formatId.toLowerCase()}`,
    name: formatId === "A" ? "Capitol Classic (Demo)" : "Wide Field (Demo)",
    formatId,
    teams,
    picks,
  };
}

export function teamRosterPoliticianIds(
  league: League,
  teamId: string,
): string[] {
  return league.picks
    .filter((p) => p.teamId === teamId && p.politicianId)
    .map((p) => p.politicianId!);
}

export function teamTotalPoints(
  league: League,
  teamId: string,
): number {
  const ids = teamRosterPoliticianIds(league, teamId);
  return ids.reduce((sum, id) => {
    const p = POLITICIANS.find((x) => x.id === id);
    return sum + (p?.demoPoints ?? 0);
  }, 0);
}
