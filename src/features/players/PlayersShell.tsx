'use client';

import { Search, Rows3, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PageLayout, Sidebar, TopNav } from '@/design-system';
import { useSession } from '@/features/auth/useSession';

interface PlayersShellProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Search', href: '/players/search', icon: Search },
  { label: 'Results', href: '/players/results', icon: Rows3 },
];

function getActivePath(pathname: string): string {
  if (pathname.startsWith('/players/search')) {
    return '/players/search';
  }

  return '/players/results';
}

export function PlayersShell({ children }: PlayersShellProps): React.ReactElement {
  const pathname = usePathname();
  const { user } = useSession();

  return (
    <PageLayout
      sidebar={
        <Sidebar
          items={navItems}
          activePath={getActivePath(pathname)}
        />
      }
      topNav={(
        <TopNav
          leagueName="Player Scout"
          user={user ? { name: user.name || user.email, email: user.email } : undefined}
        >
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.28em] text-brew-400">
              Integrated Experience
            </span>
            <a
              href="/api/auth/logout"
              className="inline-flex items-center gap-2 text-sm text-brew-300 transition-colors hover:text-vegas-gold"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Sign out
            </a>
          </div>
        </TopNav>
      )}
    >
      {children}
    </PageLayout>
  );
}
