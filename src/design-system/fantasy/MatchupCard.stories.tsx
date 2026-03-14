import type { Meta, StoryObj } from '@storybook/react-vite';
import { MatchupCard } from './MatchupCard';

const meta: Meta<typeof MatchupCard> = {
  title: 'Fantasy/MatchupCard',
  component: MatchupCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof MatchupCard>;

export const Final: Story = {
  args: {
    homeTeam: { name: 'Team Alpha', score: 112.5, record: '8-5', isUser: true },
    awayTeam: { name: "Jeff's Squad", score: 98.3, record: '6-7' },
    week: 14,
    status: 'final',
  },
};

export const Live: Story = {
  args: {
    homeTeam: { name: 'My Team', score: 87.4, record: '7-5', isUser: true },
    awayTeam: { name: 'The Destroyers', score: 92.1, record: '9-4' },
    week: 14,
    status: 'live',
  },
};

export const Upcoming: Story = {
  args: {
    homeTeam: { name: 'My Team', record: '8-5', isUser: true },
    awayTeam: { name: 'Rival Squad', record: '7-6' },
    week: 15,
    status: 'upcoming',
  },
};

export const Blowout: Story = {
  args: {
    homeTeam: { name: 'High Scorer', score: 201.4, record: '12-1', isUser: true },
    awayTeam: { name: 'Low Scorer', score: 68.2, record: '2-11' },
    week: 13,
    status: 'final',
  },
};

export const CloseGame: Story = {
  args: {
    homeTeam: { name: 'Team A', score: 122.8, record: '7-6' },
    awayTeam: { name: 'Team B', score: 121.9, record: '6-7', isUser: true },
    week: 14,
    status: 'final',
  },
};
