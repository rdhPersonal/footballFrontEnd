import type { PlayerData } from '../player/types';

export type { PlayerData };

export interface FantasyTeam {
  name: string;
  score?: number;
  record?: string;
  isUser?: boolean;
}

export interface RosterSlotConfig {
  id: string;
  position: string; // 'QB' | 'RB' | 'WR' | 'TE' | 'FLEX' | 'K' | 'DEF' | 'BN'
  player?: PlayerData;
  score?: number;
  locked?: boolean;
}
