import { cn } from '../lib/cn';

type StatBarColor = 'gold' | 'emerald' | 'crimson' | 'neon' | 'default';

interface StatBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: StatBarColor;
  showValue?: boolean;
  className?: string;
}

const colorStyles: Record<StatBarColor, string> = {
  gold: 'bg-vegas-gold',
  emerald: 'bg-vegas-emerald',
  crimson: 'bg-vegas-crimson',
  neon: 'bg-vegas-neon',
  default: 'bg-brew-400',
};

export function StatBar({
  value,
  max = 100,
  label,
  color = 'default',
  showValue = false,
  className,
}: StatBarProps): React.ReactElement {
  const clamped = Math.min(Math.max(value, 0), max);
  const pct = max > 0 ? Math.round((clamped / max) * 100) : 0;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-brew-400">{label}</span>}
          {showValue && (
            <span className="font-mono text-xs text-brew-200">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="h-2 w-full overflow-hidden rounded-full bg-brew-800"
      >
        <div
          className={cn('h-full rounded-full transition-all duration-300', colorStyles[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
