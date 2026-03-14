import { cn } from '../lib/cn';

interface PlayerStatRowProps {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
  className?: string;
}

export function PlayerStatRow({
  label,
  value,
  highlight = false,
  className,
}: PlayerStatRowProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 py-1.5',
        'border-b border-brew-700 last:border-b-0',
        className,
      )}
    >
      <span className="text-xs text-brew-400">{label}</span>
      <span
        className={cn(
          'font-mono text-sm tabular-nums',
          highlight ? 'font-semibold text-vegas-gold' : 'text-brew-200',
        )}
      >
        {value}
      </span>
    </div>
  );
}
