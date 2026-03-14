'use client';

import { LineupSlot } from './LineupSlot';
import { cn } from '../lib/cn';
import type { RosterSlotConfig } from './types';

interface RosterGridProps {
  slots: RosterSlotConfig[];
  onAddPlayer?: (slotId: string) => void;
  onDropPlayer?: (playerId: string) => void;
  className?: string;
}

// Bench slots are visually separated from starters
const BENCH_POSITION = 'BN';

export function RosterGrid({
  slots,
  onAddPlayer,
  onDropPlayer,
  className,
}: RosterGridProps): React.ReactElement {
  const starters = slots.filter((s) => s.position !== BENCH_POSITION);
  const bench = slots.filter((s) => s.position === BENCH_POSITION);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {starters.map((slot) => (
        <LineupSlot
          key={slot.id}
          position={slot.position}
          player={slot.player}
          score={slot.score}
          locked={slot.locked}
          onAddPlayer={onAddPlayer ? () => onAddPlayer(slot.id) : undefined}
          onDropPlayer={onDropPlayer}
        />
      ))}

      {bench.length > 0 && (
        <>
          <div className="my-1 flex items-center gap-2">
            <div className="h-px flex-1 bg-brew-700" />
            <span className="text-xs font-medium uppercase tracking-wider text-brew-600">
              Bench
            </span>
            <div className="h-px flex-1 bg-brew-700" />
          </div>
          {bench.map((slot) => (
            <LineupSlot
              key={slot.id}
              position={slot.position}
              player={slot.player}
              score={slot.score}
              locked={slot.locked}
              onAddPlayer={onAddPlayer ? () => onAddPlayer(slot.id) : undefined}
              onDropPlayer={onDropPlayer}
            />
          ))}
        </>
      )}
    </div>
  );
}
