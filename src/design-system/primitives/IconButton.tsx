'use client';

import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';

const variantStyles = {
  primary:
    'bg-vegas-gold text-brew-950 hover:bg-vegas-champagne focus-visible:ring-vegas-gold',
  secondary:
    'bg-brew-800 text-brew-200 border border-brew-700 hover:border-brew-400 focus-visible:ring-brew-400',
  ghost:
    'bg-transparent text-brew-400 hover:bg-brew-800 hover:text-brew-200 focus-visible:ring-brew-400',
  danger:
    'bg-vegas-crimson text-white hover:bg-vegas-crimson/80 focus-visible:ring-vegas-crimson',
} as const;

const sizeStyles = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
} as const;

const iconSizeStyles = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
} as const;

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** The Lucide icon component to render */
  icon: LucideIcon;
  /** Required — used as aria-label for screen readers */
  label: string;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon: Icon,
      label,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-label={label}
        aria-busy={loading || undefined}
        className={cn(
          'inline-flex items-center justify-center rounded-md transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brew-950',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...rest}
      >
        {loading ? (
          <span
            className={cn(
              'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
              iconSizeStyles[size],
            )}
            role="status"
          >
            <span className="sr-only">Loading</span>
          </span>
        ) : (
          <Icon className={iconSizeStyles[size]} aria-hidden />
        )}
      </button>
    );
  },
);
