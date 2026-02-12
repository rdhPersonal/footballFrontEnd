'use client';

import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '../lib/cn';

const variantStyles = {
  primary:
    'bg-vegas-gold text-brew-950 hover:bg-vegas-champagne focus-visible:ring-vegas-gold',
  secondary:
    'bg-brew-800 text-brew-200 border border-brew-700 hover:border-brew-400 focus-visible:ring-brew-400',
  ghost:
    'bg-transparent text-brew-200 border border-brew-700 hover:border-brew-400 hover:bg-brew-800 focus-visible:ring-brew-400',
  danger:
    'bg-vegas-crimson text-white hover:bg-vegas-crimson/80 focus-visible:ring-vegas-crimson',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
} as const;

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
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
        aria-busy={loading || undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brew-950',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...rest}
      >
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" role="status">
            <span className="sr-only">Loading</span>
          </span>
        )}
        {children}
      </button>
    );
  },
);
