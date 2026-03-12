import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Home, Users, Trophy } from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { NavItem } from './Sidebar';

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Players', href: '/players', icon: Users },
  { label: 'Matchups', href: '/matchups', icon: Trophy },
];

describe('Sidebar', () => {
  // --- Rendering ---

  it('renders as a nav element with accessible label', () => {
    render(<Sidebar items={navItems} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('renders all nav item labels', () => {
    render(<Sidebar items={navItems} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Players')).toBeInTheDocument();
    expect(screen.getByText('Matchups')).toBeInTheDocument();
  });

  it('renders nav items as links', () => {
    render(<Sidebar items={navItems} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('renders correct href for each item', () => {
    render(<Sidebar items={navItems} />);
    expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Players/ })).toHaveAttribute('href', '/players');
    expect(screen.getByRole('link', { name: /Matchups/ })).toHaveAttribute('href', '/matchups');
  });

  // --- Active state ---

  it('marks the active item with aria-current="page"', () => {
    render(<Sidebar items={navItems} activePath="/players" />);
    const activeLink = screen.getByRole('link', { name: /Players/ });
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current on inactive items', () => {
    render(<Sidebar items={navItems} activePath="/players" />);
    expect(screen.getByRole('link', { name: /Dashboard/ })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: /Matchups/ })).not.toHaveAttribute('aria-current');
  });

  it('applies active styles to the active item', () => {
    render(<Sidebar items={navItems} activePath="/players" />);
    const activeLink = screen.getByRole('link', { name: /Players/ });
    expect(activeLink.className).toContain('text-vegas-gold');
  });

  it('applies inactive styles to non-active items', () => {
    render(<Sidebar items={navItems} activePath="/players" />);
    const inactiveLink = screen.getByRole('link', { name: /Dashboard/ });
    expect(inactiveLink.className).toContain('text-brew-400');
  });

  it('does not set aria-current when no activePath provided', () => {
    render(<Sidebar items={navItems} />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).not.toHaveAttribute('aria-current');
    });
  });

  // --- Icons ---

  it('renders icons as aria-hidden', () => {
    render(<Sidebar items={navItems} />);
    const icons = document.querySelectorAll('[aria-hidden]');
    expect(icons.length).toBeGreaterThanOrEqual(navItems.length);
  });

  // --- Empty state ---

  it('renders nothing in the list when items is empty', () => {
    render(<Sidebar items={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  // --- className override ---

  it('merges custom className', () => {
    render(<Sidebar items={navItems} className="w-72" />);
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('w-72');
  });
});
