'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../lib/cn';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  className?: string;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select…',
  disabled,
  label,
  error,
  className,
}: SelectProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-sm font-medium text-brew-200">{label}</span>
      )}
      <RadixSelect.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border bg-brew-800 px-3 text-sm',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vegas-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brew-950',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-vegas-crimson text-brew-50'
              : 'border-brew-700 text-brew-50 hover:border-brew-400',
            className,
          )}
          aria-label={label}
        >
          <RadixSelect.Value
            placeholder={
              <span className="text-brew-600">{placeholder}</span>
            }
          />
          <RadixSelect.Icon>
            <ChevronDown className="h-4 w-4 text-brew-400" aria-hidden />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className={cn(
              'z-50 w-[var(--radix-select-trigger-width)] overflow-hidden',
              'rounded-md border border-brew-700 bg-brew-800 shadow-brew',
            )}
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-brew-200',
                    'outline-none transition-colors duration-150',
                    'data-[highlighted]:bg-brew-700 data-[highlighted]:text-brew-50',
                    'data-[state=checked]:text-vegas-gold',
                  )}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute right-3">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {error && (
        <p className="text-xs text-vegas-crimson" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
