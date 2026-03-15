'use client';

import { useEffect, useState, useTransition } from 'react';
import type { GetPlayersQuery, SeasonsSummaryDto, TeamDto } from '@/types/api-contract';
import { Button, Card, Input, Select } from '@/design-system';
import { getSeasons, getTeams } from '@/lib/api-client';
import { buildPlayerSearchHref, type PlayerSearchFilters } from '@/features/players/search-params';
import { useRouter } from 'next/navigation';

interface PlayerSearchFormProps {
  initialFilters?: PlayerSearchFilters;
  submitLabel?: string;
}

const ALL_VALUE = '__all__';

const positionOptions = [
  { value: ALL_VALUE, label: 'Any position' },
  { value: 'QB', label: 'Quarterback' },
  { value: 'RB', label: 'Running Back' },
  { value: 'WR', label: 'Wide Receiver' },
  { value: 'TE', label: 'Tight End' },
  { value: 'K', label: 'Kicker' },
  { value: 'DEF', label: 'Defense' },
];

function sortTeams(teams: TeamDto[]): TeamDto[] {
  return [...teams].sort((left, right) => left.name.localeCompare(right.name));
}

function sortSeasons(seasons: SeasonsSummaryDto[]): SeasonsSummaryDto[] {
  return [...seasons].sort((left, right) => right.season - left.season);
}

export function PlayerSearchForm({
  initialFilters,
  submitLabel = 'Search Players',
}: PlayerSearchFormProps): React.ReactElement {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(initialFilters?.search ?? '');
  const [position, setPosition] = useState(initialFilters?.position ?? ALL_VALUE);
  const [team, setTeam] = useState(initialFilters?.team ?? ALL_VALUE);
  const [season, setSeason] = useState(
    initialFilters?.season !== undefined ? String(initialFilters.season) : ALL_VALUE,
  );

  const [teams, setTeams] = useState<TeamDto[]>([]);
  const [seasons, setSeasons] = useState<SeasonsSummaryDto[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    Promise.all([getTeams(), getSeasons()])
      .then(([teamsResponse, seasonsResponse]) => {
        if (ignore) return;

        setTeams(sortTeams(teamsResponse.teams));
        setSeasons(sortSeasons(seasonsResponse.seasons));
        setLoadError(null);
      })
      .catch(() => {
        if (!ignore) {
          setLoadError('Could not load search options right now.');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const filters: PlayerSearchFilters = {
      search: search.trim() || undefined,
      position: position !== ALL_VALUE ? position as GetPlayersQuery['position'] : undefined,
      team: team !== ALL_VALUE ? team : undefined,
      season: season !== ALL_VALUE ? Number.parseInt(season, 10) : undefined,
    };

    startTransition(() => {
      router.push(buildPlayerSearchHref(filters));
    });
  }

  function resetFilters(): void {
    setSearch('');
    setPosition(ALL_VALUE);
    setTeam(ALL_VALUE);
    setSeason(ALL_VALUE);
  }

  return (
    <Card>
      <Card.Header>
        <div>
          <h2 className="text-lg font-semibold text-brew-50">Find Players</h2>
          <p className="mt-1 text-sm text-brew-400">
            Search by name, position, team, or season to start scouting.
          </p>
        </div>
      </Card.Header>
      <Card.Body>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <Input
              label="Name"
              placeholder="Patrick Mahomes, CeeDee Lamb, ..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Select
              label="Position"
              value={position}
              onValueChange={setPosition}
              options={positionOptions}
            />
            <Select
              label="Team"
              value={team}
              onValueChange={setTeam}
              placeholder="Select a team"
              options={[
                { value: ALL_VALUE, label: 'Any team' },
                ...teams.map((entry) => ({
                  value: entry.abbr,
                  label: `${entry.name} (${entry.abbr})`,
                })),
              ]}
            />
            <Select
              label="Season"
              value={season}
              onValueChange={setSeason}
              placeholder="Select a season"
              options={[
                { value: ALL_VALUE, label: 'Any season' },
                ...seasons.map((entry) => ({
                  value: String(entry.season),
                  label: String(entry.season),
                })),
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg" loading={isPending}>
              {submitLabel}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={resetFilters}
            >
              Clear Filters
            </Button>
            {loadError && (
              <p className="text-sm text-vegas-crimson">{loadError}</p>
            )}
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}
