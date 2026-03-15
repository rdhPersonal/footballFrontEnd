'use client';

import type {
  GetPlayerStatsResponse,
  KickingStatsDto,
  PassingStatsDto,
  ReceivingStatsDto,
  RosterHistoryEntryDto,
  RushingStatsDto,
  ScoringConfigDto,
  SeasonsSummaryDto,
} from '@football/api-contract';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowLeft, BarChart3, CalendarRange, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Section,
  Select,
  StatTable,
} from '@/design-system';
import {
  ApiClientError,
  getPlayer,
  getPlayerRosterHistory,
  getPlayerScores,
  getPlayerStats,
  getScoringConfigs,
  getSeasons,
} from '@/lib/api-client';
import { formatDate, formatHeight, formatRosterStatus, formatWeight } from '@/features/players/formatters';

interface PlayerDetailViewProps {
  playerId: string;
  initialSeason?: number;
  initialWeek?: number;
  initialScoring?: string;
  returnTo: string;
}

const ALL_VALUE = '__all__';

const passingColumns: ColumnDef<PassingStatsDto>[] = [
  { accessorKey: 'week', header: 'Week' },
  { accessorKey: 'teamAbbr', header: 'Team' },
  { accessorKey: 'attempts', header: 'Att' },
  { accessorKey: 'completions', header: 'Cmp' },
  { accessorKey: 'yards', header: 'Yards' },
  { accessorKey: 'touchdowns', header: 'TD' },
  { accessorKey: 'interceptions', header: 'INT' },
  { accessorKey: 'qbRating', header: 'RTG' },
];

const rushingColumns: ColumnDef<RushingStatsDto>[] = [
  { accessorKey: 'week', header: 'Week' },
  { accessorKey: 'teamAbbr', header: 'Team' },
  { accessorKey: 'attempts', header: 'Att' },
  { accessorKey: 'yards', header: 'Yards' },
  { accessorKey: 'touchdowns', header: 'TD' },
  { accessorKey: 'longest', header: 'Long' },
  { accessorKey: 'fumblesLost', header: 'FL' },
];

const receivingColumns: ColumnDef<ReceivingStatsDto>[] = [
  { accessorKey: 'week', header: 'Week' },
  { accessorKey: 'teamAbbr', header: 'Team' },
  { accessorKey: 'targets', header: 'Targets' },
  { accessorKey: 'receptions', header: 'Rec' },
  { accessorKey: 'yards', header: 'Yards' },
  { accessorKey: 'touchdowns', header: 'TD' },
  { accessorKey: 'longest', header: 'Long' },
];

const kickingColumns: ColumnDef<KickingStatsDto>[] = [
  { accessorKey: 'week', header: 'Week' },
  { accessorKey: 'teamAbbr', header: 'Team' },
  { accessorKey: 'fgMade', header: 'FGM' },
  { accessorKey: 'fgAttempted', header: 'FGA' },
  { accessorKey: 'fgLong', header: 'Long' },
  { accessorKey: 'xpMade', header: 'XPM' },
  { accessorKey: 'points', header: 'Pts' },
];

const rosterColumns: ColumnDef<RosterHistoryEntryDto>[] = [
  { accessorKey: 'season', header: 'Season' },
  { accessorKey: 'teamAbbr', header: 'Team' },
  { accessorKey: 'weekStart', header: 'From' },
  { accessorKey: 'weekEnd', header: 'To' },
  {
    accessorKey: 'rosterStatus',
    header: 'Status',
    cell: ({ row }) => formatRosterStatus(row.original.rosterStatus),
  },
  {
    accessorKey: 'transactionType',
    header: 'Transaction',
    cell: ({ row }) => formatRosterStatus(row.original.transactionType),
  },
];

function sortSeasons(seasons: SeasonsSummaryDto[]): SeasonsSummaryDto[] {
  return [...seasons].sort((left, right) => right.season - left.season);
}

export function PlayerDetailView({
  playerId,
  initialSeason,
  initialWeek,
  initialScoring,
  returnTo,
}: PlayerDetailViewProps): React.ReactElement {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [player, setPlayer] = useState<Awaited<ReturnType<typeof getPlayer>> | null>(null);
  const [rosterHistory, setRosterHistory] = useState<Awaited<ReturnType<typeof getPlayerRosterHistory>> | null>(null);
  const [stats, setStats] = useState<GetPlayerStatsResponse | null>(null);
  const [scores, setScores] = useState<Awaited<ReturnType<typeof getPlayerScores>> | null>(null);
  const [seasons, setSeasons] = useState<SeasonsSummaryDto[]>([]);
  const [scoringConfigs, setScoringConfigs] = useState<ScoringConfigDto[]>([]);

  const [seasonValue, setSeasonValue] = useState(
    initialSeason !== undefined ? String(initialSeason) : ALL_VALUE,
  );
  const [weekValue, setWeekValue] = useState(
    initialWeek !== undefined ? String(initialWeek) : ALL_VALUE,
  );
  const [scoringValue, setScoringValue] = useState(initialScoring ?? 'Standard');

  const [baseLoading, setBaseLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setBaseLoading(true);
    setError(null);

    Promise.all([
      getPlayer(playerId),
      getPlayerRosterHistory(playerId),
      getSeasons(),
      getScoringConfigs(),
    ])
      .then(([playerResponse, historyResponse, seasonsResponse, scoringResponse]) => {
        if (ignore) return;

        const sortedSeasons = sortSeasons(seasonsResponse.seasons);
        setPlayer(playerResponse);
        setRosterHistory(historyResponse);
        setSeasons(sortedSeasons);
        setScoringConfigs(scoringResponse.configs);

        setSeasonValue((current) => (
          current === ALL_VALUE && sortedSeasons.length > 0
            ? String(sortedSeasons[0].season)
            : current
        ));

        if (!initialScoring && scoringResponse.configs.length > 0) {
          setScoringValue(scoringResponse.configs[0].name);
        }
      })
      .catch((err) => {
        if (ignore) return;

        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Could not load player details.');
        }
      })
      .finally(() => {
        if (!ignore) {
          setBaseLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [initialScoring, playerId]);

  useEffect(() => {
    if (seasonValue === ALL_VALUE) {
      return;
    }

    let ignore = false;
    setDataLoading(true);
    setError(null);

    const season = Number.parseInt(seasonValue, 10);
    const week = weekValue !== ALL_VALUE ? Number.parseInt(weekValue, 10) : undefined;

    Promise.all([
      getPlayerStats(playerId, { season, week }),
      getPlayerScores(playerId, { season, scoring: scoringValue }),
    ])
      .then(([statsResponse, scoresResponse]) => {
        if (ignore) return;

        setStats(statsResponse);
        setScores(scoresResponse);
      })
      .catch((err) => {
        if (ignore) return;

        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Could not load player statistics.');
        }
      })
      .finally(() => {
        if (!ignore) {
          setDataLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [playerId, scoringValue, seasonValue, weekValue]);

  function applyFilters(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const params = new URLSearchParams();
    if (seasonValue !== ALL_VALUE) params.set('season', seasonValue);
    if (weekValue !== ALL_VALUE) params.set('week', weekValue);
    if (scoringValue && scoringValue !== 'Standard') params.set('scoring', scoringValue);
    if (returnTo) params.set('returnTo', returnTo);

    const query = params.toString();

    startTransition(() => {
      router.replace(query ? `/players/${playerId}?${query}` : `/players/${playerId}`);
    });
  }

  if (baseLoading || !player) {
    return (
      <Section title="Loading player">
        <Card>
          <Card.Body>
            <p className="text-sm text-brew-400">Pulling player profile and scouting data...</p>
          </Card.Body>
        </Card>
      </Section>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Player details unavailable"
        description={error}
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href={returnTo}
          className="inline-flex items-center gap-2 text-sm text-brew-300 transition-colors hover:text-vegas-gold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to results
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[1.6fr_1fr]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(212,168,67,0.18),_transparent_55%),linear-gradient(135deg,_rgba(18,17,26,1),_rgba(10,10,15,1))] px-6 py-7">
            <div className="flex items-start gap-4">
              <Avatar name={player.name} src={player.photoUrl ?? undefined} size="xl" />
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-vegas-gold/80">
                    Player Detail
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold text-brew-50">
                    {player.name}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="position" size="md">{player.position}</Badge>
                  <Badge>{player.currentTeamAbbr ?? 'Free Agent'}</Badge>
                  <Badge>{formatRosterStatus(player.rosterStatus)}</Badge>
                </div>
                <dl className="grid gap-3 text-sm text-brew-300 sm:grid-cols-2">
                  <div>
                    <dt className="text-brew-500">Born</dt>
                    <dd>{formatDate(player.dateOfBirth)}</dd>
                  </div>
                  <div>
                    <dt className="text-brew-500">College</dt>
                    <dd>{player.college || 'Unknown'}</dd>
                  </div>
                  <div>
                    <dt className="text-brew-500">Height</dt>
                    <dd>{formatHeight(player.heightInches)}</dd>
                  </div>
                  <div>
                    <dt className="text-brew-500">Weight</dt>
                    <dd>{formatWeight(player.weightLbs)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="border-t border-brew-700 bg-brew-900 px-6 py-7 lg:border-l lg:border-t-0">
            <form className="space-y-4" onSubmit={applyFilters}>
              <h2 className="text-lg font-semibold text-brew-50">Filters</h2>
              <Select
                label="Season"
                value={seasonValue}
                onValueChange={setSeasonValue}
                options={
                  seasons.length > 0
                    ? seasons.map((entry) => ({
                        value: String(entry.season),
                        label: `${entry.season} (${entry.statCounts.passing + entry.statCounts.rushing + entry.statCounts.receiving + entry.statCounts.kicking} stat rows)`,
                      }))
                    : [{ value: ALL_VALUE, label: 'Loading seasons...' }]
                }
              />
              <Select
                label="Week"
                value={weekValue}
                onValueChange={setWeekValue}
                options={[
                  { value: ALL_VALUE, label: 'All weeks' },
                  ...Array.from({ length: 18 }, (_, index) => ({
                    value: String(index + 1),
                    label: `Week ${index + 1}`,
                  })),
                ]}
              />
              <Select
                label="Scoring"
                value={scoringValue}
                onValueChange={setScoringValue}
                options={
                  scoringConfigs.length > 0
                    ? scoringConfigs.map((config) => ({
                        value: config.name,
                        label: config.name,
                      }))
                    : [{ value: scoringValue, label: 'Loading scoring...' }]
                }
              />
              <Button type="submit" loading={isPending} className="w-full">
                Apply Filters
              </Button>
            </form>
          </div>
        </div>
      </Card>

      <Section
        title="Scoring Snapshot"
        description="Weekly fantasy scoring and season totals for the current filter set."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <Card.Body>
              <p className="text-xs uppercase tracking-[0.22em] text-brew-500">Scoring Format</p>
              <p className="mt-3 text-2xl font-semibold text-brew-50">
                {scores?.scoringFormat ?? scoringValue}
              </p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <p className="text-xs uppercase tracking-[0.22em] text-brew-500">Season Points</p>
              <p className="mt-3 text-2xl font-semibold text-vegas-gold">
                {scores?.totalPoints.toFixed(2) ?? '0.00'}
              </p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <p className="text-xs uppercase tracking-[0.22em] text-brew-500">Weeks Logged</p>
              <p className="mt-3 text-2xl font-semibold text-brew-50">
                {scores?.weeks.length ?? 0}
              </p>
            </Card.Body>
          </Card>
        </div>
      </Section>

      <Section
        title="Statistics"
        description="Production is split by category so you can scan usage and output quickly."
      >
        <div className="space-y-6">
          {dataLoading ? (
            <Card>
              <Card.Body>
                <p className="text-sm text-brew-400">Refreshing stat tables...</p>
              </Card.Body>
            </Card>
          ) : (
            <>
              {stats && stats.passing.length > 0 && (
                <Card>
                  <Card.Header>
                    <h3 className="text-lg font-semibold text-brew-50">Passing</h3>
                  </Card.Header>
                  <Card.Body>
                    <StatTable columns={passingColumns} data={stats.passing} pageSize={6} />
                  </Card.Body>
                </Card>
              )}
              {stats && stats.rushing.length > 0 && (
                <Card>
                  <Card.Header>
                    <h3 className="text-lg font-semibold text-brew-50">Rushing</h3>
                  </Card.Header>
                  <Card.Body>
                    <StatTable columns={rushingColumns} data={stats.rushing} pageSize={6} />
                  </Card.Body>
                </Card>
              )}
              {stats && stats.receiving.length > 0 && (
                <Card>
                  <Card.Header>
                    <h3 className="text-lg font-semibold text-brew-50">Receiving</h3>
                  </Card.Header>
                  <Card.Body>
                    <StatTable columns={receivingColumns} data={stats.receiving} pageSize={6} />
                  </Card.Body>
                </Card>
              )}
              {stats && stats.kicking.length > 0 && (
                <Card>
                  <Card.Header>
                    <h3 className="text-lg font-semibold text-brew-50">Kicking</h3>
                  </Card.Header>
                  <Card.Body>
                    <StatTable columns={kickingColumns} data={stats.kicking} pageSize={6} />
                  </Card.Body>
                </Card>
              )}
              {stats &&
                stats.passing.length === 0 &&
                stats.rushing.length === 0 &&
                stats.receiving.length === 0 &&
                stats.kicking.length === 0 && (
                  <EmptyState
                    icon={BarChart3}
                    title="No stats for this filter"
                    description="Try a different season or remove the week filter."
                  />
                )}
            </>
          )}
        </div>
      </Section>

      <Section
        title="Weekly Scoring"
        description="Fantasy points by week for the selected season and scoring format."
      >
        {scores && scores.weeks.length > 0 ? (
          <Card>
            <Card.Body>
              <StatTable
                columns={[
                  { accessorKey: 'week', header: 'Week' },
                  { accessorKey: 'teamAbbr', header: 'Team' },
                  { accessorKey: 'points', header: 'Points' },
                ]}
                data={scores.weeks}
                pageSize={8}
              />
            </Card.Body>
          </Card>
        ) : (
          <EmptyState
            icon={CalendarRange}
            title="No weekly scores yet"
            description="This player has no recorded fantasy scores for the selected season."
          />
        )}
      </Section>

      <Section
        title="Roster History"
        description="Timeline of the player's team and roster status transitions."
      >
        {rosterHistory && rosterHistory.rosterHistory.length > 0 ? (
          <Card>
            <Card.Body>
              <StatTable
                columns={rosterColumns}
                data={rosterHistory.rosterHistory}
                pageSize={8}
              />
            </Card.Body>
          </Card>
        ) : (
          <EmptyState
            icon={CalendarRange}
            title="No roster history available"
            description="Roster timeline data has not been loaded for this player yet."
          />
        )}
      </Section>
    </div>
  );
}
