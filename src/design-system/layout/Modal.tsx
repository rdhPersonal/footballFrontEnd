'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/cn';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Visible title — also used as the dialog's accessible name */
  title: string;
  /** Optional subtitle rendered below the title */
  description?: string;
  children: React.ReactNode;
  /** Extra classes applied to the dialog panel */
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: ModalProps): React.ReactElement {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-brew-950/80 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
            'rounded-lg bg-brew-800 border border-brew-700 shadow-brew p-6',
            className,
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <Dialog.Title className="text-lg font-semibold text-brew-50">
              {title}
            </Dialog.Title>
            <Dialog.Close
              className={cn(
                'rounded-md p-1 text-brew-400 transition-colors duration-200',
                'hover:bg-brew-700 hover:text-brew-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vegas-gold',
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden />
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="mb-4 text-sm text-brew-400">
              {description}
            </Dialog.Description>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
