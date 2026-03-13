'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { StatSparkline } from '../data-display/StatSparkline';
import { PlayerStatRow } from './PlayerStatRow';
import { cn } from '../lib/cn';
import type { PlayerData, PlayerStatsData } from './types';

interface PlayerCardDetailedProps {
  player: PlayerData;
  stats?: PlayerStatsData;
  weeklyPoints?: number[];
  rank?: number;
  onAdd?: () => void;
  onDrop?: () => void;
  className?: string;
}

const injuryLabel: Record<NonNullable<PlayerData['injuryStatus']>, string> = {
  healthy: 'Active',
  questionable: 'Questionable',
  doubtful: 'Doubtful',
  out: 'Out',
  ir: 'Injured Reserve',
};

export function PlayerCardDetailed({
  player,
  stats,
  weeklyPoints,
  rank,
  onAdd,
  onDrop,
  className,
}: PlayerCardDetailedProps): React.ReactElement {
  const hasInjury = player.injuryStatus && player.injuryStatus !== 'healthy';

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-brew-700 bg-brew-900 p-4 shadow-brew',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={player.name} src={player.photoUrl} size="lg" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {rank !== undefined && (
                <span className="font-mono text-xs text-brew-400">#{rank}</span>
              )}
              <h3 className="text-base font-semibold text-brew-50">
                {player.name}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="position" size="sm">
                {player.position}
              </Badge>
              <span className="text-sm text-brew-400">{player.teamAbbr}</span>
              {player.byeWeek !== undefined && (
                <span className="text-xs text-brew-600">
                  Bye {player.byeWeek}
                </span>
              )}
              {hasInjury && (
                <Badge variant="status" status={player.injuryStatus} size="sm">
                  {injuryLabel[player.injuryStatus!]}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {weeklyPoints && weeklyPoints.length >= 2 && (
          <StatSparkline
            data={weeklyPoints}
            color="gold"
            width={80}
            height={32}
          />
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div className="flex flex-col">
          <PlayerStatRow
            label="Fantasy Points"
            value={stats.totalPoints.toFixed(1)}
            highlight
          />
          <PlayerStatRow
            label="Projected"
            value={stats.projectedPoints.toFixed(1)}
          />
          <PlayerStatRow
            label="Games Played"
            value={stats.gamesPlayed}
          />
          {stats.avgPoints !== undefined && (
            <PlayerStatRow
              label="Avg / Game"
              value={stats.avgPoints.toFixed(1)}
            />
          )}
        </div>
      )}

      {/* Actions */}
      {(onAdd || onDrop) && (
        <div className="flex gap-2 border-t border-brew-700 pt-3">
          {onAdd && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAdd}
              className="flex-1"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add
            </Button>
          )}
          {onDrop && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDrop}
              className="flex-1 text-vegas-crimson hover:text-vegas-crimson"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
              Drop
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
