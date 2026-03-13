import type { Meta, StoryObj } from '@storybook/react';
import { Search, Users, Trophy, AlertCircle } from 'lucide-react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: { title: 'No players found' },
};

export const WithDescription: Story = {
  args: {
    title: 'No players found',
    description: 'Try adjusting your search or filter criteria.',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'No players found',
    description: 'Your search returned no results.',
    icon: Search,
  },
};

export const WithAction: Story = {
  args: {
    title: 'Your roster is empty',
    description: 'Add players from the waiver wire to get started.',
    icon: Users,
    action: { label: 'Browse Waivers', onClick: () => {} },
  },
};

export const NoMatchups: Story = {
  args: {
    title: 'No matchups this week',
    description: 'Check back when the season begins.',
    icon: Trophy,
  },
};

export const ErrorState: Story = {
  args: {
    title: 'Failed to load players',
    description: 'There was an error fetching player data. Please try again.',
    icon: AlertCircle,
    action: { label: 'Retry', onClick: () => {} },
  },
};
