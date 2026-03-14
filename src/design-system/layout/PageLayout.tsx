import { cn } from '../lib/cn';

interface PageLayoutProps {
  /** Sidebar content — typically a <Sidebar /> component */
  sidebar?: React.ReactNode;
  /** Top navigation — typically a <TopNav /> component */
  topNav?: React.ReactNode;
  children: React.ReactNode;
  /** Extra classes applied to the main content area */
  className?: string;
}

export function PageLayout({
  sidebar,
  topNav,
  children,
  className,
}: PageLayoutProps): React.ReactElement {
  return (
    <div className="flex min-h-screen bg-brew-950">
      {sidebar && (
        <aside className="shrink-0" aria-label="Sidebar">
          {sidebar}
        </aside>
      )}
      <div className="flex flex-1 flex-col min-w-0">
        {topNav && topNav}
        <main className={cn('flex-1 overflow-auto p-6', className)}>
          {children}
        </main>
      </div>
    </div>
  );
}
