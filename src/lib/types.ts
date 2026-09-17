export type Party = "D" | "R" | "I";

export type PositionCategory =
  | "senator"
  | "representative"
  | "senate_leadership"
  | "house_leadership"
  | "federal_leadership"
  | "governor"
  | "state_upper"
  | "state_lower"
  | "state_legislator"
  | "cabinet_agency";

export interface Politician {
  id: string;
  name: string;
  party: Party;
  state: string;
  category: PositionCategory;
  title: string;
  /** Demo fantasy points for the current scoring period */
  demoPoints: number;
  /** Short note on what scored (DEMO DATA) */
  lastAction: string;
}

export type LeagueFormatId = "A" | "B";

export interface RosterSlot {
  key: string;
  label: string;
  categories: PositionCategory[];
}

export interface LeagueFormat {
  id: LeagueFormatId;
  name: string;
  teamCount: number;
  description: string;
  slots: RosterSlot[];
}

export interface LeagueTeam {
  id: string;
  name: string;
  owner: string;
}

export interface DraftPick {
  round: number;
  pick: number;
  teamId: string;
  politicianId: string | null;
}

export interface League {
  id: string;
  name: string;
  formatId: LeagueFormatId;
  teams: LeagueTeam[];
  picks: DraftPick[];
}
