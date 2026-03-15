import { describe, expect, it } from 'vitest';
import {
  buildPlayerSearchHref,
  buildPlayerSearchQuery,
  hasPlayerSearchFilters,
  parsePlayerSearchFilters,
} from './search-params';

describe('player search params', () => {
  it('parses supported search filters', () => {
    expect(
      parsePlayerSearchFilters({
        search: '  Josh Allen ',
        position: 'qb',
        team: 'buf',
        season: '2024',
      }),
    ).toEqual({
      search: 'Josh Allen',
      position: 'QB',
      team: 'BUF',
      season: 2024,
    });
  });

  it('ignores invalid filter values', () => {
    expect(
      parsePlayerSearchFilters({
        position: 'coach',
        season: 'not-a-year',
      }),
    ).toEqual({});
  });

  it('builds a results href from filters', () => {
    expect(
      buildPlayerSearchHref({
        search: 'Lamb',
        position: 'WR',
        season: 2024,
      }),
    ).toBe('/players/results?search=Lamb&position=WR&season=2024');
  });

  it('detects whether filters are present', () => {
    expect(hasPlayerSearchFilters({})).toBe(false);
    expect(hasPlayerSearchFilters({ team: 'KC' })).toBe(true);
    expect(buildPlayerSearchQuery({})).toBe('');
  });
});
