import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: EmptyStateAction;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
}: EmptyStateProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-brew-700 bg-brew-900 px-6 py-12 text-center',
        className,
      )}
    >
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brew-800">
          <Icon className="h-6 w-6 text-brew-400" aria-hidden />
        </div>
      )}
      <div className="space-y-1">
        <p className="text-base font-semibold text-brew-50">{title}</p>
        {description && <p className="text-sm text-brew-400">{description}</p>}
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'rounded-md bg-vegas-gold px-4 py-2 text-sm font-medium text-brew-950',
            'hover:bg-vegas-champagne transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vegas-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brew-950',
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
