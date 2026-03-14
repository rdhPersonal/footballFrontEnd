import { cn } from '../lib/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardSectionProps {
  className?: string;
  children: React.ReactNode;
}

function CardRoot({ className, children }: CardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'rounded-lg bg-brew-900 border border-brew-700 shadow-brew',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children }: CardSectionProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-5 py-4 border-b border-brew-700',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardBody({ className, children }: CardSectionProps): React.ReactElement {
  return (
    <div className={cn('px-5 py-4', className)}>
      {children}
    </div>
  );
}

function CardFooter({ className, children }: CardSectionProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex items-center px-5 py-4 border-t border-brew-700',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
