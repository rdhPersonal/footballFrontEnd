import { cn } from '../lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps): React.ReactElement {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-brew-800', className)}
      aria-hidden
    />
  );
}
