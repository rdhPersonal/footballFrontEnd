import { cn } from '../lib/cn';

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  children,
  className,
}: SectionProps): React.ReactElement {
  return (
    <section className={cn('py-6', className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-brew-50">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-brew-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
