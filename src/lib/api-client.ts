import type { Player, PlayerStats } from '@/types/player';

interface ApiError {
  error: string;
}

class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

async function fetchBff<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/api/auth/login';
      }
      throw new ApiClientError('Unauthorized', 401);
    }

    const body: ApiError = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new ApiClientError(body.error, response.status);
  }

  return response.json();
}

// --- Players ---

export interface PlayersResponse {
  players: Player[];
  count: number;
  limit: number;
  offset: number;
}

export interface PlayersParams {
  position?: string;
  team?: string;
  season?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getPlayers(params: PlayersParams = {}): Promise<PlayersResponse> {
  const query = new URLSearchParams();
  if (params.position) query.set('position', params.position);
  if (params.team) query.set('team', params.team);
  if (params.season) query.set('season', String(params.season));
  if (params.search) query.set('search', params.search);
  if (params.limit) query.set('limit', String(params.limit));
  if (params.offset) query.set('offset', String(params.offset));

  const qs = query.toString();
  return fetchBff<PlayersResponse>(`/api/players${qs ? `?${qs}` : ''}`);
}

// --- Single Player ---

export interface PlayerDetail {
  id: string;
  externalId: string;
  name: string;
  position: string;
  photoUrl: string | null;
  dateOfBirth: string | null;
  college: string | null;
  heightInches: number | null;
  weightLbs: number | null;
  currentTeamAbbr: string | null;
  rosterStatus: string | null;
}

export async function getPlayer(id: string): Promise<PlayerDetail> {
  return fetchBff<PlayerDetail>(`/api/players/${id}`);
}

// --- Player Stats ---

export interface PlayerStatsResponse {
  playerId: string;
  stats: Array<{
    season: number;
    week: number;
    teamAbbr: string;
    gamesPlayed: number;
    totalPoints: number;
    projectedPoints: number | null;
    statDetails: Record<string, unknown>;
  }>;
  count: number;
}

export interface PlayerStatsParams {
  season?: number;
  week?: number;
}

export async function getPlayerStats(
  id: string,
  params: PlayerStatsParams = {},
): Promise<PlayerStatsResponse> {
  const query = new URLSearchParams();
  if (params.season) query.set('season', String(params.season));
  if (params.week) query.set('week', String(params.week));

  const qs = query.toString();
  return fetchBff<PlayerStatsResponse>(`/api/players/${id}/stats${qs ? `?${qs}` : ''}`);
}

// --- Roster History ---

export interface RosterHistoryResponse {
  playerId: string;
  rosterHistory: Array<{
    teamAbbr: string;
    season: number;
    weekStart: number;
    weekEnd: number | null;
    rosterStatus: string;
    transactionType: string;
  }>;
  count: number;
}

export async function getPlayerRosterHistory(id: string): Promise<RosterHistoryResponse> {
  return fetchBff<RosterHistoryResponse>(`/api/players/${id}/roster-history`);
}

export { ApiClientError };
