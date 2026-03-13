'use client';

import { type ComponentPropsWithoutRef, forwardRef, useId } from 'react';
import { cn } from '../lib/cn';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, error, hint, className, id: idProp, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-brew-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          className={cn(
            'h-10 w-full rounded-md border bg-brew-800 px-3 text-sm text-brew-50',
            'placeholder:text-brew-600',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brew-950',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-vegas-crimson focus-visible:ring-vegas-crimson'
              : 'border-brew-700 hover:border-brew-400 focus-visible:ring-vegas-gold',
            className,
          )}
          {...rest}
        />
        {error && (
          <p id={errorId} className="text-xs text-vegas-crimson" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={hintId} className="text-xs text-brew-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
