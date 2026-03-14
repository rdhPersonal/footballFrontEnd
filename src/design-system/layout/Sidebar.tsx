import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/cn';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  items: NavItem[];
  /** The href of the currently active route */
  activePath?: string;
  className?: string;
}

export function Sidebar({
  items,
  activePath,
  className,
}: SidebarProps): React.ReactElement {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'flex flex-col w-60 min-h-screen bg-brew-900 border-r border-brew-700 py-6 px-3',
        className,
      )}
    >
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.href;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'bg-vegas-gold/10 text-vegas-gold'
                    : 'text-brew-400 hover:bg-brew-800 hover:text-brew-200',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
