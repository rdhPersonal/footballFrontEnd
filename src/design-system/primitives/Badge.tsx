import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

type BadgeVariant = 'default' | 'position' | 'status' | 'score';
type BadgeSize = 'sm' | 'md';
type InjuryStatus = 'healthy' | 'questionable' | 'doubtful' | 'out' | 'ir';
type ScoreTier = 'elite' | 'good' | 'average' | 'poor';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Required when variant is "status" */
  status?: InjuryStatus;
  /** Required when variant is "score" */
  tier?: ScoreTier;
  children: ReactNode;
  className?: string;
}

const defaultStyles = 'bg-brew-800 text-brew-200 border border-brew-700';
const positionStyles = 'bg-vegas-gold text-brew-950 font-bold';

const statusStyles: Record<InjuryStatus, string> = {
  healthy: 'bg-vegas-emerald/20 text-vegas-emerald',
  questionable: 'bg-vegas-amber/20 text-vegas-amber',
  doubtful: 'bg-vegas-crimson/20 text-vegas-crimson',
  out: 'bg-vegas-crimson/20 text-vegas-crimson',
  ir: 'bg-vegas-crimson/20 text-vegas-crimson',
};

const scoreStyles: Record<ScoreTier, string> = {
  elite: 'bg-vegas-emerald/20 text-vegas-emerald',
  good: 'bg-vegas-gold/20 text-vegas-gold',
  average: 'bg-brew-800 text-brew-400',
  poor: 'bg-vegas-crimson/20 text-vegas-crimson',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

function getVariantStyles(
  variant: BadgeVariant,
  status?: InjuryStatus,
  tier?: ScoreTier,
): string {
  switch (variant) {
    case 'position':
      return positionStyles;
    case 'status':
      return statusStyles[status ?? 'healthy'];
    case 'score':
      return scoreStyles[tier ?? 'average'];
    default:
      return defaultStyles;
  }
}

export function Badge({
  variant = 'default',
  size = 'sm',
  status,
  tier,
  children,
  className,
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium leading-none',
        sizeStyles[size],
        getVariantStyles(variant, status, tier),
        className,
      )}
    >
      {children}
    </span>
  );
}
