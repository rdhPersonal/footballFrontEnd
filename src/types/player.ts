export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';

export type InjuryStatus = 'healthy' | 'questionable' | 'doubtful' | 'out' | 'ir';

export interface Player {
  id: string;
  externalId: string;
  name: string;
  position: Position;
  photoUrl: string | null;
  dateOfBirth: string | null;
  college: string | null;
  heightInches: number | null;
  weightLbs: number | null;
  currentTeamAbbr: string | null;
  rosterStatus: string | null;
}

export interface NflTeam {
  id: number;
  abbr: string;
  name: string;
  conference: string;
  division: string;
  byeWeek: number | null;
  season: number;
}

export interface PassingStat {
  season: number;
  week: number;
  teamAbbr: string;
  attempts: number;
  completions: number;
  yards: number;
  touchdowns: number;
  interceptions: number;
  sacks: number;
  longest: number;
  qbRating: number | null;
  adjQbr: number | null;
}

export interface RushingStat {
  season: number;
  week: number;
  teamAbbr: string;
  attempts: number;
  yards: number;
  touchdowns: number;
  longest: number;
  fumbles: number;
  fumblesLost: number;
}

export interface ReceivingStat {
  season: number;
  week: number;
  teamAbbr: string;
  targets: number;
  receptions: number;
  yards: number;
  touchdowns: number;
  longest: number;
}

export interface KickingStat {
  season: number;
  week: number;
  teamAbbr: string;
  fgMade: number;
  fgAttempted: number;
  fgLong: number;
  fgPct: number | null;
  xpMade: number;
  xpAttempted: number;
  points: number;
}

export interface ScoringConfig {
  id: number;
  name: string;
  description: string | null;
  passingYardPts: number;
  passingTdPts: number;
  interceptionPts: number;
  sackPts: number;
  rushingYardPts: number;
  rushingTdPts: number;
  receivingYardPts: number;
  receivingTdPts: number;
  receptionPts: number;
  fumbleLostPts: number;
  fgMadePts: number;
  xpMadePts: number;
}

export interface SeasonSummary {
  season: number;
  playerCount: number;
  minWeek: number;
  maxWeek: number;
  statCounts: {
    passing: number;
    rushing: number;
    receiving: number;
    kicking: number;
  };
}
