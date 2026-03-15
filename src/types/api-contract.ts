/**
 * Football API Contract Types
 *
 * These types define the request/response DTOs for all backend API endpoints.
 * They are the frontend's copy of the contract — kept in sync manually with
 * the backend (footballBackEnd) whenever endpoints change.
 *
 * Version: 0.1.0 (matches footballBackEnd packages/api-contract@0.1.0)
 * Last synced: 2026-03-15
 */

// --- Enums / Unions ---

export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'P' | 'DEF';

export type RosterStatus =
  | 'active'
  | 'practice_squad'
  | 'injured_reserve'
  | 'suspended'
  | 'pup';

export type TransactionType =
  | 'drafted'
  | 'signed'
  | 'traded'
  | 'claimed'
  | 'promoted'
  | 'demoted'
  | 'activated'
  | 'released';

// --- Entity DTOs ---

export interface PlayerDto {
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
  rosterStatus: RosterStatus | null;
}

export interface PassingStatsDto {
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

export interface RushingStatsDto {
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

export interface ReceivingStatsDto {
  season: number;
  week: number;
  teamAbbr: string;
  targets: number;
  receptions: number;
  yards: number;
  touchdowns: number;
  longest: number;
}

export interface KickingStatsDto {
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

export interface ScoringConfigDto {
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

export interface TeamDto {
  id: number;
  abbr: string;
  name: string;
  conference: string;
  division: string;
  byeWeek: number | null;
  season: number;
}

export interface RosterHistoryEntryDto {
  teamAbbr: string;
  season: number;
  weekStart: number;
  weekEnd: number | null;
  rosterStatus: RosterStatus;
  transactionType: TransactionType;
}

export interface SeasonsSummaryDto {
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

// --- Query / Response Types ---

export type PlayerSearchPosition = Exclude<Position, 'P'>;

export interface ApiErrorResponse {
  error: string;
}

export interface GetPlayersQuery {
  position?: PlayerSearchPosition;
  team?: string;
  search?: string;
  season?: number;
  limit?: number;
  offset?: number;
}

export interface GetPlayersResponse {
  players: PlayerDto[];
  totalCount: number;
  count: number;
  limit: number;
  offset: number;
}

export type GetPlayerResponse = PlayerDto;

export interface GetPlayerStatsQuery {
  season?: number;
  week?: number;
}

export interface GetPlayerStatsResponse {
  playerId: string;
  passing: PassingStatsDto[];
  rushing: RushingStatsDto[];
  receiving: ReceivingStatsDto[];
  kicking: KickingStatsDto[];
}

export interface GetPlayerRosterHistoryResponse {
  playerId: string;
  rosterHistory: RosterHistoryEntryDto[];
  count: number;
}

export interface GetPlayerScoresQuery {
  season: number;
  scoring?: string;
}

export interface GetPlayerScoresResponse {
  playerId: string;
  season: number;
  scoringFormat: string;
  totalPoints: number;
  weeks: Array<{
    week: number;
    teamAbbr: string;
    points: number;
  }>;
}

export interface GetScoringConfigsResponse {
  configs: ScoringConfigDto[];
}

export interface GetTeamsQuery {
  season?: number;
}

export interface GetTeamsResponse {
  teams: TeamDto[];
  count: number;
}

export interface GetSeasonsResponse {
  seasons: SeasonsSummaryDto[];
}

export interface FootballApiContract {
  '/players': {
    GET: {
      query: GetPlayersQuery;
      response: GetPlayersResponse;
      error: ApiErrorResponse;
    };
  };
  '/players/{id}': {
    GET: {
      response: GetPlayerResponse;
      error: ApiErrorResponse;
    };
  };
  '/players/{id}/stats': {
    GET: {
      query: GetPlayerStatsQuery;
      response: GetPlayerStatsResponse;
      error: ApiErrorResponse;
    };
  };
  '/players/{id}/roster-history': {
    GET: {
      response: GetPlayerRosterHistoryResponse;
      error: ApiErrorResponse;
    };
  };
  '/players/{id}/scores': {
    GET: {
      query: GetPlayerScoresQuery;
      response: GetPlayerScoresResponse;
      error: ApiErrorResponse;
    };
  };
  '/scoring-configs': {
    GET: {
      response: GetScoringConfigsResponse;
      error: ApiErrorResponse;
    };
  };
  '/teams': {
    GET: {
      query: GetTeamsQuery;
      response: GetTeamsResponse;
      error: ApiErrorResponse;
    };
  };
  '/seasons': {
    GET: {
      response: GetSeasonsResponse;
      error: ApiErrorResponse;
    };
  };
}
