'use client';

import { Plus, Lock } from 'lucide-react';
import { IconButton } from '../primitives/IconButton';
import { PlayerMiniCard } from '../player/PlayerMiniCard';
import { cn } from '../lib/cn';
import type { PlayerData } from '../player/types';

interface LineupSlotProps {
  position: string;
  player?: PlayerData;
  score?: number;
  locked?: boolean;
  onAddPlayer?: () => void;
  onDropPlayer?: (playerId: string) => void;
  className?: string;
}

export function LineupSlot({
  position,
  player,
  score,
  locked = false,
  onAddPlayer,
  onDropPlayer,
  className,
}: LineupSlotProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-brew-900 px-3 py-2.5',
        locked ? 'border-brew-700 opacity-60' : 'border-brew-700',
        className,
      )}
      aria-label={`${position} slot${player ? `: ${player.name}` : ': empty'}`}
    >
      {/* Slot label */}
      <span className="w-10 shrink-0 text-center font-mono text-xs font-semibold uppercase text-brew-600">
        {position}
      </span>

      {/* Player or empty state */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        {player ? (
          <PlayerMiniCard player={player} size="sm" />
        ) : (
          <span className="text-sm italic text-brew-600">Empty</span>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {/* Score */}
          {score !== undefined && player && (
            <span className="font-mono text-sm font-semibold text-vegas-gold tabular-nums">
              {score.toFixed(2)}
            </span>
          )}

          {/* Lock indicator */}
          {locked && (
            <Lock className="h-3.5 w-3.5 text-brew-600" aria-label="Locked" />
          )}

          {/* Actions */}
          {!locked && player && onDropPlayer && (
            <IconButton
              icon={Plus}
              label={`Drop ${player.name}`}
              size="sm"
              variant="ghost"
              onClick={() => onDropPlayer(player.id)}
              className="rotate-45 text-brew-400 hover:text-vegas-crimson"
            />
          )}
          {!locked && !player && onAddPlayer && (
            <IconButton
              icon={Plus}
              label={`Add player to ${position}`}
              size="sm"
              variant="ghost"
              onClick={onAddPlayer}
              className="text-brew-400 hover:text-vegas-gold"
            />
          )}
        </div>
      </div>
    </div>
  );
}
