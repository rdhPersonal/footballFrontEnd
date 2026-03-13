// Shared player types for the design-system player category.
// These mirror src/types/player.ts — design system stays app-agnostic
// by owning its own type definitions.

export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';

export type InjuryStatus = 'healthy' | 'questionable' | 'doubtful' | 'out' | 'ir';

export interface PlayerData {
  id: string;
  name: string;
  position: Position;
  teamAbbr: string;
  photoUrl?: string;
  injuryStatus?: InjuryStatus;
  byeWeek?: number;
}

export interface PlayerStatsData {
  gamesPlayed: number;
  totalPoints: number;
  projectedPoints: number;
  [key: string]: number;
}
