'use client';

import { X } from 'lucide-react';
import { IconButton } from '../primitives/IconButton';
import { StatSparkline } from '../data-display/StatSparkline';
import { PlayerMiniCard } from './PlayerMiniCard';
import { cn } from '../lib/cn';
import type { PlayerData, PlayerStatsData } from './types';

interface PlayerCompareTrayProps {
  playerA: PlayerData;
  playerB: PlayerData;
  statsA?: PlayerStatsData;
  statsB?: PlayerStatsData;
  weeklyPointsA?: number[];
  weeklyPointsB?: number[];
  onClose?: () => void;
  className?: string;
}

interface StatCompareRowProps {
  label: string;
  valueA: number;
  valueB: number;
  format?: (v: number) => string;
}

function StatCompareRow({
  label,
  valueA,
  valueB,
  format = (v) => v.toFixed(1),
}: StatCompareRowProps): React.ReactElement {
  const aWins = valueA > valueB;
  const bWins = valueB > valueA;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-1.5 border-b border-brew-700 last:border-b-0">
      <span
        className={cn(
          'font-mono text-sm tabular-nums text-right',
          aWins ? 'font-semibold text-vegas-gold' : 'text-brew-400',
        )}
      >
        {format(valueA)}
      </span>
      <span className="text-center text-xs text-brew-600">{label}</span>
      <span
        className={cn(
          'font-mono text-sm tabular-nums text-left',
          bWins ? 'font-semibold text-vegas-gold' : 'text-brew-400',
        )}
      >
        {format(valueB)}
      </span>
    </div>
  );
}

export function PlayerCompareTray({
  playerA,
  playerB,
  statsA,
  statsB,
  weeklyPointsA,
  weeklyPointsB,
  onClose,
  className,
}: PlayerCompareTrayProps): React.ReactElement {
  const hasStats = statsA && statsB;

  return (
    <div
      role="region"
      aria-label="Player comparison"
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-brew-700 bg-brew-900 p-4 shadow-brew',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brew-400">
          Compare Players
        </h2>
        {onClose && (
          <IconButton icon={X} label="Close comparison" size="sm" variant="ghost" onClick={onClose} />
        )}
      </div>

      {/* Player headers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <PlayerMiniCard player={playerA} size="sm" />
          {weeklyPointsA && weeklyPointsA.length >= 2 && (
            <StatSparkline data={weeklyPointsA} color="gold" width={100} height={28} />
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <PlayerMiniCard player={playerB} size="sm" className="flex-row-reverse" />
          {weeklyPointsB && weeklyPointsB.length >= 2 && (
            <StatSparkline data={weeklyPointsB} color="default" width={100} height={28} />
          )}
        </div>
      </div>

      {/* Stat comparison */}
      {hasStats && (
        <div className="flex flex-col">
          <StatCompareRow
            label="Pts"
            valueA={statsA.totalPoints}
            valueB={statsB.totalPoints}
          />
          <StatCompareRow
            label="Proj"
            valueA={statsA.projectedPoints}
            valueB={statsB.projectedPoints}
          />
          <StatCompareRow
            label="GP"
            valueA={statsA.gamesPlayed}
            valueB={statsB.gamesPlayed}
            format={(v) => String(v)}
          />
          {statsA.avgPoints !== undefined && statsB.avgPoints !== undefined && (
            <StatCompareRow
              label="Avg"
              valueA={statsA.avgPoints}
              valueB={statsB.avgPoints}
            />
          )}
        </div>
      )}

      {!hasStats && (
        <p className="text-center text-xs text-brew-600">No stats available</p>
      )}
    </div>
  );
}
