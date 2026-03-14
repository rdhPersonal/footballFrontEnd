import { cn } from '../lib/cn';

type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
  orientation?: DividerOrientation;
  /** Optional text label centered in a horizontal divider */
  label?: string;
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  label,
  className,
}: DividerProps): React.ReactElement {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px self-stretch bg-brew-700', className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-label={label}
        className={cn('flex items-center gap-3', className)}
      >
        <div className="h-px flex-1 bg-brew-700" />
        <span className="text-xs text-brew-600">{label}</span>
        <div className="h-px flex-1 bg-brew-700" />
      </div>
    );
  }

  return (
    <hr
      className={cn('border-0 border-t border-brew-700', className)}
    />
  );
}
