'use client';

import type { PlayerDto } from '@football/api-contract';
import type { ColumnDef } from '@tanstack/react-table';
import { SearchX } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Card, EmptyState, StatTable } from '@/design-system';
import { ApiClientError, getPlayers } from '@/lib/api-client';
import {
  hasPlayerSearchFilters,
  type PlayerSearchFilters,
} from '@/features/players/search-params';
import { formatRosterStatus, formatWeight, formatHeight, formatNumber } from '@/features/players/formatters';

interface PlayerResultsTableProps {
  filters: PlayerSearchFilters;
  returnTo: string;
}

type PlayerResultRow = PlayerDto & { __returnTo: string };

const columns: ColumnDef<PlayerResultRow>[] = [
  {
    accessorKey: 'name',
    header: 'Player',
    cell: ({ row }) => {
      const player = row.original;
      const encodedReturnTo = encodeURIComponent(player.__returnTo);

      return (
        <Link
          href={`/players/${player.id}?returnTo=${encodedReturnTo}`}
          className="font-sans font-semibold text-vegas-gold transition-colors hover:text-vegas-champagne"
        >
          {player.name}
        </Link>
      );
    },
  },
  {
    accessorKey: 'position',
    header: 'Pos',
    cell: ({ row }) => (
      <Badge variant="position" size="sm">
        {row.original.position}
      </Badge>
    ),
  },
  {
    accessorKey: 'currentTeamAbbr',
    header: 'Team',
    cell: ({ row }) => row.original.currentTeamAbbr ?? 'FA',
  },
  {
    accessorKey: 'rosterStatus',
    header: 'Roster',
    cell: ({ row }) => formatRosterStatus(row.original.rosterStatus),
  },
  {
    id: 'size',
    header: 'Build',
    cell: ({ row }) => `${formatHeight(row.original.heightInches)} / ${formatWeight(row.original.weightLbs)}`,
  },
];

export function PlayerResultsTable({
  filters,
  returnTo,
}: PlayerResultsTableProps): React.ReactElement {
  const [players, setPlayers] = useState<PlayerResultRow[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasPlayerSearchFilters(filters)) {
      setPlayers([]);
      setTotalCount(0);
      setError(null);
      setIsLoading(false);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError(null);

    getPlayers({ ...filters, limit: 100 })
      .then((response) => {
        if (ignore) return;

        setPlayers(
          response.players.map((player): PlayerResultRow => ({
            ...player,
            __returnTo: returnTo,
          })),
        );
        setTotalCount(response.totalCount);
      })
      .catch((err) => {
        if (ignore) return;

        if (err instanceof ApiClientError) {
          setError(err.message);
        } else {
          setError('Could not load player results.');
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [filters, returnTo]);

  if (!hasPlayerSearchFilters(filters)) {
    return (
      <EmptyState
        icon={SearchX}
        title="No criteria yet"
        description="Add at least one filter on the search page to build a player list."
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={SearchX}
        title="Results unavailable"
        description={error}
      />
    );
  }

  return (
    <Card>
      <Card.Header>
        <div>
          <h2 className="text-lg font-semibold text-brew-50">Search Results</h2>
          <p className="mt-1 text-sm text-brew-400">
            {isLoading
              ? 'Loading players...'
              : `${formatNumber(totalCount)} players matched your current criteria.`}
          </p>
        </div>
      </Card.Header>
      <Card.Body>
        <StatTable
          columns={columns}
          data={players}
          pageSize={12}
        />
      </Card.Body>
    </Card>
  );
}
