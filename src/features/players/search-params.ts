import type { GetPlayersQuery } from '@football/api-contract';

type SearchParamValue = string | string[] | undefined;

export interface PlayerSearchFilters {
  search?: string;
  position?: GetPlayersQuery['position'];
  team?: string;
  season?: number;
}

const POSITION_VALUES = new Set(['QB', 'RB', 'WR', 'TE', 'K', 'DEF']);

function getFirstValue(value: SearchParamValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function parsePlayerSearchFilters(
  searchParams: Record<string, SearchParamValue>,
): PlayerSearchFilters {
  const search = getFirstValue(searchParams.search)?.trim();
  const positionValue = getFirstValue(searchParams.position)?.toUpperCase();
  const team = getFirstValue(searchParams.team)?.toUpperCase();
  const seasonValue = getFirstValue(searchParams.season);
  const season = seasonValue ? Number.parseInt(seasonValue, 10) : undefined;

  return {
    search: search || undefined,
    position: positionValue && POSITION_VALUES.has(positionValue)
      ? positionValue as GetPlayersQuery['position']
      : undefined,
    team: team || undefined,
    season: Number.isFinite(season) ? season : undefined,
  };
}

export function hasPlayerSearchFilters(filters: PlayerSearchFilters): boolean {
  return Boolean(filters.search || filters.position || filters.team || filters.season);
}

export function buildPlayerSearchQuery(filters: PlayerSearchFilters): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set('search', filters.search);
  }

  if (filters.position) {
    params.set('position', filters.position);
  }

  if (filters.team) {
    params.set('team', filters.team);
  }

  if (filters.season !== undefined) {
    params.set('season', String(filters.season));
  }

  return params.toString();
}

export function buildPlayerSearchHref(filters: PlayerSearchFilters): string {
  const query = buildPlayerSearchQuery(filters);
  return query ? `/players/results?${query}` : '/players/results';
}
