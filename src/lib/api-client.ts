import type {
  ApiErrorResponse,
  GetPlayerResponse as PlayerDetail,
  GetPlayerRosterHistoryResponse as RosterHistoryResponse,
  GetPlayerScoresQuery as PlayerScoresParams,
  GetPlayerScoresResponse as PlayerScoresResponse,
  GetPlayerStatsQuery as PlayerStatsParams,
  GetPlayerStatsResponse as PlayerStatsResponse,
  GetPlayersQuery as PlayersParams,
  GetPlayersResponse as PlayersResponse,
  GetScoringConfigsResponse as ScoringConfigsResponse,
  GetSeasonsResponse as SeasonsResponse,
  GetTeamsQuery as TeamsParams,
  GetTeamsResponse as TeamsResponse,
} from '@/types/api-contract';

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
        const returnTo = `${window.location.pathname}${window.location.search}`;
        window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
      }
      throw new ApiClientError('Unauthorized', 401);
    }

    const body: ApiErrorResponse = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new ApiClientError(body.error, response.status);
  }

  return response.json();
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

export async function getPlayer(id: string): Promise<PlayerDetail> {
  return fetchBff<PlayerDetail>(`/api/players/${id}`);
}

// --- Player Stats ---

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

export async function getPlayerRosterHistory(id: string): Promise<RosterHistoryResponse> {
  return fetchBff<RosterHistoryResponse>(`/api/players/${id}/roster-history`);
}

// --- Player Scores ---

export async function getPlayerScores(
  id: string,
  params: PlayerScoresParams,
): Promise<PlayerScoresResponse> {
  const query = new URLSearchParams();
  query.set('season', String(params.season));
  if (params.scoring) query.set('scoring', params.scoring);

  return fetchBff<PlayerScoresResponse>(`/api/players/${id}/scores?${query.toString()}`);
}

// --- Scoring Configs ---

export async function getScoringConfigs(): Promise<ScoringConfigsResponse> {
  return fetchBff<ScoringConfigsResponse>('/api/scoring-configs');
}

// --- Teams ---

export async function getTeams(params: TeamsParams = {}): Promise<TeamsResponse> {
  const query = new URLSearchParams();
  if (params.season !== undefined) query.set('season', String(params.season));

  const qs = query.toString();
  return fetchBff<TeamsResponse>(`/api/teams${qs ? `?${qs}` : ''}`);
}

// --- Seasons ---

export async function getSeasons(): Promise<SeasonsResponse> {
  return fetchBff<SeasonsResponse>('/api/seasons');
}

export { ApiClientError };
