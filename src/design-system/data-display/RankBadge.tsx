import { cn } from '../lib/cn';

type RankBadgeSize = 'sm' | 'md' | 'lg';

interface RankBadgeProps {
  rank: number;
  size?: RankBadgeSize;
  className?: string;
}

const sizeStyles: Record<RankBadgeSize, string> = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
};

function getRankStyle(rank: number): string {
  if (rank === 1) return 'bg-vegas-gold text-brew-950 font-bold';
  if (rank === 2) return 'bg-brew-400 text-brew-950 font-bold';
  if (rank === 3) return 'bg-amber-700 text-brew-50 font-bold';
  return 'bg-brew-800 text-brew-200 border border-brew-700';
}

export function RankBadge({
  rank,
  size = 'md',
  className,
}: RankBadgeProps): React.ReactElement {
  return (
    <span
      aria-label={`Rank ${rank}`}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-mono shrink-0',
        sizeStyles[size],
        getRankStyle(rank),
        className,
      )}
    >
      {rank}
    </span>
  );
}
