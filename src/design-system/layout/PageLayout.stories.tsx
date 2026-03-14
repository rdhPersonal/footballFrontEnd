import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Users, List, Trophy, RefreshCw, ArrowLeftRight } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { Section } from './Section';
import { Card } from './Card';

const navItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Players', href: '/players', icon: Users },
  { label: 'Roster', href: '/roster', icon: List },
  { label: 'Matchups', href: '/matchups', icon: Trophy },
  { label: 'Waivers', href: '/waivers', icon: RefreshCw },
  { label: 'Trades', href: '/trades', icon: ArrowLeftRight },
];

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  render: () => (
    <PageLayout>
      <Section title="Dashboard">
        <p className="text-brew-200">Main content area.</p>
      </Section>
    </PageLayout>
  ),
};

export const WithSidebarAndTopNav: Story = {
  render: () => (
    <PageLayout
      sidebar={<Sidebar items={navItems} activePath="/players" />}
      topNav={
        <TopNav
          leagueName="The Big League"
          user={{ name: 'Alex Johnson', email: 'alex@example.com' }}
        />
      }
    >
      <Section title="Players" description="Search and manage players">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <Card.Header>
              <span className="font-medium text-brew-50">Patrick Mahomes</span>
            </Card.Header>
            <Card.Body>
              <p className="text-sm text-brew-400">QB — Kansas City Chiefs</p>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <span className="font-medium text-brew-50">Tyreek Hill</span>
            </Card.Header>
            <Card.Body>
              <p className="text-sm text-brew-400">WR — Miami Dolphins</p>
            </Card.Body>
          </Card>
        </div>
      </Section>
    </PageLayout>
  ),
};
