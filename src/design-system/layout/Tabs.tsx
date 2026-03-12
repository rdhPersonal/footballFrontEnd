'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../lib/cn';

function TabsRoot({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTabs.Root>): React.ReactElement {
  return (
    <RadixTabs.Root className={cn('flex flex-col', className)} {...props} />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTabs.List>): React.ReactElement {
  return (
    <RadixTabs.List
      className={cn(
        'flex items-end gap-0 border-b border-brew-700',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>): React.ReactElement {
  return (
    <RadixTabs.Trigger
      className={cn(
        'border-b-2 border-transparent px-4 py-2.5 -mb-px text-sm font-medium text-brew-400',
        'transition-colors duration-200',
        'hover:text-brew-200',
        'data-[state=active]:border-vegas-gold data-[state=active]:text-vegas-gold',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vegas-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brew-950',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTabs.Content>): React.ReactElement {
  return (
    <RadixTabs.Content
      className={cn('pt-4 focus-visible:outline-none', className)}
      {...props}
    />
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
