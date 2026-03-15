import type { PlayerDto as Player } from './api-contract';

export interface LeagueTeam {
  id: string;
  name: string;
  ownerId: string;
  roster: Player[];
}

export interface Matchup {
  id: string;
  week: number;
  homeTeam: LeagueTeam;
  awayTeam: LeagueTeam;
  homeScore?: number;
  awayScore?: number;
}

export interface League {
  id: string;
  name: string;
  season: number;
  currentWeek: number;
  teams: LeagueTeam[];
}
