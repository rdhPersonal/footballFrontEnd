'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/cn';

interface WeekSelectorProps {
  currentWeek: number;
  totalWeeks?: number;
  minWeek?: number;
  onWeekChange: (week: number) => void;
  className?: string;
}

export function WeekSelector({
  currentWeek,
  totalWeeks = 18,
  minWeek = 1,
  onWeekChange,
  className,
}: WeekSelectorProps): React.ReactElement {
  const canGoPrev = currentWeek > minWeek;
  const canGoNext = currentWeek < totalWeeks;

  return (
    <div
      role="group"
      aria-label="Week selector"
      className={cn('flex items-center gap-2', className)}
    >
      <button
        type="button"
        onClick={() => canGoPrev && onWeekChange(currentWeek - 1)}
        disabled={!canGoPrev}
        aria-label="Previous week"
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md border border-brew-700 transition-colors duration-150',
          canGoPrev
            ? 'text-brew-200 hover:border-vegas-gold/30 hover:text-brew-50'
            : 'cursor-not-allowed opacity-40 text-brew-600',
        )}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="min-w-[6rem] text-center text-sm font-medium text-brew-200"
      >
        Week {currentWeek}
      </span>

      <button
        type="button"
        onClick={() => canGoNext && onWeekChange(currentWeek + 1)}
        disabled={!canGoNext}
        aria-label="Next week"
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md border border-brew-700 transition-colors duration-150',
          canGoNext
            ? 'text-brew-200 hover:border-vegas-gold/30 hover:text-brew-50'
            : 'cursor-not-allowed opacity-40 text-brew-600',
        )}
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
