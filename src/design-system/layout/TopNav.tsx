import { cn } from '../lib/cn';

interface TopNavUser {
  name: string;
  email?: string;
}

interface TopNavProps {
  leagueName?: string;
  user?: TopNavUser;
  /** Additional content rendered in the left slot (e.g. breadcrumb, page title) */
  children?: React.ReactNode;
  className?: string;
}

export function TopNav({
  leagueName,
  user,
  children,
  className,
}: TopNavProps): React.ReactElement {
  return (
    <header
      className={cn(
        'flex items-center justify-between h-16 px-6 bg-brew-900 border-b border-brew-700',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {leagueName && (
          <span className="text-sm font-medium text-brew-200">{leagueName}</span>
        )}
        {children}
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-brew-200 leading-none">
              {user.name}
            </p>
            {user.email && (
              <p className="mt-0.5 text-xs text-brew-400">{user.email}</p>
            )}
          </div>
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vegas-gold/20 text-sm font-bold text-vegas-gold"
            aria-hidden
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </header>
  );
}
