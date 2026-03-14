'use client';

import { useId } from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '../lib/cn';

type CheckboxSize = 'sm' | 'md' | 'lg';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSize;
  className?: string;
  'aria-label'?: string;
}

const sizeStyles: Record<CheckboxSize, { box: string; icon: number; text: string }> = {
  sm: { box: 'h-3.5 w-3.5', icon: 10, text: 'text-xs' },
  md: { box: 'h-4 w-4',   icon: 12, text: 'text-sm' },
  lg: { box: 'h-5 w-5',   icon: 14, text: 'text-base' },
};

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  size = 'md',
  className,
  'aria-label': ariaLabel,
}: CheckboxProps): React.ReactElement {
  const id = useId();
  const { box, icon, text } = sizeStyles[size];

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-label={ariaLabel}
          ref={(el) => {
            if (el) el.indeterminate = indeterminate;
          }}
          onChange={(e) => onChange(e.target.checked)}
          className={cn(
            'peer appearance-none rounded-sm border transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vegas-gold focus-visible:ring-offset-1 focus-visible:ring-offset-brew-950',
            box,
            checked || indeterminate
              ? 'border-vegas-gold bg-vegas-gold'
              : 'border-brew-600 bg-brew-900',
            disabled
              ? 'cursor-not-allowed opacity-40'
              : 'cursor-pointer hover:border-vegas-gold/70',
          )}
        />
        {(checked || indeterminate) && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-brew-950">
            {indeterminate ? (
              <Minus size={icon} strokeWidth={3} />
            ) : (
              <Check size={icon} strokeWidth={3} />
            )}
          </span>
        )}
      </div>

      {label && (
        <label
          htmlFor={id}
          className={cn(
            text,
            'select-none text-brew-200',
            disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
