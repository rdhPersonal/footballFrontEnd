'use client';

import { cn } from '../lib/cn';
import { PlayerMiniCard } from './PlayerMiniCard';
import type { PlayerData } from './types';

interface PlayerCardCompactProps {
  player: PlayerData;
  statLabel?: string;
  statValue?: string | number;
  selected?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
}

export function PlayerCardCompact({
  player,
  statLabel,
  statValue,
  selected = false,
  onSelect,
  className,
}: PlayerCardCompactProps): React.ReactElement {
  const isInteractive = !!onSelect;

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-pressed={isInteractive ? selected : undefined}
      onClick={isInteractive ? () => onSelect(player.id) : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(player.id);
              }
            }
          : undefined
      }
      className={cn(
        'flex items-center justify-between gap-3 rounded-lg border bg-brew-900 px-3 py-2.5',
        'transition-colors duration-150',
        isInteractive && 'cursor-pointer select-none',
        selected
          ? 'border-vegas-gold/50 ring-1 ring-vegas-gold/30'
          : 'border-brew-700',
        isInteractive && !selected && 'hover:border-brew-400',
        className,
      )}
    >
      <PlayerMiniCard player={player} size="sm" />

      {statLabel !== undefined && statValue !== undefined && (
        <div className="shrink-0 text-right">
          <p className="font-mono text-sm font-semibold text-brew-50">
            {statValue}
          </p>
          <p className="text-xs text-brew-400">{statLabel}</p>
        </div>
      )}
    </div>
  );
}
