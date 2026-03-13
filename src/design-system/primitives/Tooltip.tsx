'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '../lib/cn';

interface TooltipProps {
  /** The tooltip content */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Delay in ms before the tooltip opens. Defaults to 300. */
  delayDuration?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = 'top',
  delayDuration = 300,
  className,
}: TooltipProps): React.ReactElement {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className={cn(
              'z-50 max-w-xs rounded-md border border-brew-700 bg-brew-800 px-3 py-1.5',
              'text-xs text-brew-200 shadow-brew',
              className,
            )}
          >
            {content}
            <RadixTooltip.Arrow className="fill-brew-700" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
