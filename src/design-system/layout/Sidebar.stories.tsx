import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Users, List, Trophy, RefreshCw, ArrowLeftRight } from 'lucide-react';
import { Sidebar } from './Sidebar';
import type { NavItem } from './Sidebar';

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Players', href: '/players', icon: Users },
  { label: 'Roster', href: '/roster', icon: List },
  { label: 'Matchups', href: '/matchups', icon: Trophy },
  { label: 'Waivers', href: '/waivers', icon: RefreshCw },
  { label: 'Trades', href: '/trades', icon: ArrowLeftRight },
];

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    items: navItems,
  },
};

export const WithActivePath: Story = {
  args: {
    items: navItems,
    activePath: '/players',
  },
};

export const DashboardActive: Story = {
  args: {
    items: navItems,
    activePath: '/',
  },
};

export const AllItems: Story = {
  render: () => (
    <div className="flex">
      <Sidebar items={navItems} activePath="/matchups" />
      <div className="flex-1 p-6 bg-brew-950">
        <p className="text-brew-200">Main content area</p>
      </div>
    </div>
  ),
};
