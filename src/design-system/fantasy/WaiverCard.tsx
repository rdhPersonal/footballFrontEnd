'use client';

import { Plus } from 'lucide-react';
import { Button } from '../primitives/Button';
import { PlayerMiniCard } from '../player/PlayerMiniCard';
import { cn } from '../lib/cn';
import type { PlayerData } from '../player/types';

interface WaiverCardProps {
  player: PlayerData;
  waiverOrder?: number;
  faabBid?: number;
  onAdd?: (playerId: string) => void;
  className?: string;
}

export function WaiverCard({
  player,
  waiverOrder,
  faabBid,
  onAdd,
  className,
}: WaiverCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-lg border border-brew-700 bg-brew-900 px-3 py-2.5',
        'transition-colors duration-150 hover:border-brew-400',
        className,
      )}
    >
      <PlayerMiniCard player={player} size="sm" />

      <div className="flex shrink-0 items-center gap-3">
        {/* Waiver info */}
        <div className="text-right">
          {waiverOrder !== undefined && (
            <p className="font-mono text-xs text-brew-400">
              #{waiverOrder} waiver
            </p>
          )}
          {faabBid !== undefined && (
            <p className="font-mono text-xs text-brew-600">
              ${faabBid} FAAB
            </p>
          )}
        </div>

        {/* Add button */}
        {onAdd && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAdd(player.id)}
            aria-label={`Add ${player.name}`}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add
          </Button>
        )}
      </div>
    </div>
  );
}
