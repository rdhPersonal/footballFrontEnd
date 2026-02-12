export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';

export type InjuryStatus = 'healthy' | 'questionable' | 'doubtful' | 'out' | 'ir';

export interface PlayerStats {
  gamesPlayed: number;
  totalPoints: number;
  projectedPoints: number;
  [key: string]: number;
}

export interface Player {
  id: string;
  name: string;
  position: Position;
  teamAbbr: string;
  photoUrl?: string;
  injuryStatus?: InjuryStatus;
  byeWeek?: number;
  stats?: PlayerStats;
}
