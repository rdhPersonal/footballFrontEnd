'use client';

import * as Switch from '@radix-ui/react-switch';
import { cn } from '../lib/cn';

interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Visible label displayed beside the toggle */
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onCheckedChange,
  label,
  disabled,
  className,
}: ToggleProps): React.ReactElement {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={label}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vegas-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brew-950',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-vegas-gold' : 'bg-brew-700',
        )}
      >
        <Switch.Thumb
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full shadow-brew',
            'transition-transform duration-200',
            'bg-brew-50',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </Switch.Root>
      {label && (
        <span
          className={cn(
            'text-sm font-medium',
            disabled ? 'text-brew-600' : 'text-brew-200',
          )}
          aria-hidden
        >
          {label}
        </span>
      )}
    </div>
  );
}
