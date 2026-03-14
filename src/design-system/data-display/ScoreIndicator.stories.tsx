import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScoreIndicator } from './ScoreIndicator';

const meta: Meta<typeof ScoreIndicator> = {
  title: 'Data Display/ScoreIndicator',
  component: ScoreIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ScoreIndicator>;

export const Default: Story = {
  args: { homeScore: 112.5, awayScore: 98.3 },
};

export const WithTeams: Story = {
  args: {
    homeScore: 112.5,
    awayScore: 98.3,
    homeTeam: "Patrick's Squad",
    awayTeam: "Jeff's Team",
  },
};

export const Win: Story = {
  args: {
    homeScore: 134.2,
    awayScore: 101.8,
    homeTeam: 'My Team',
    awayTeam: 'Opponent',
    result: 'win',
  },
};

export const Loss: Story = {
  args: {
    homeScore: 89.4,
    awayScore: 118.6,
    homeTeam: 'My Team',
    awayTeam: 'Opponent',
    result: 'loss',
  },
};

export const Tie: Story = {
  args: {
    homeScore: 100.0,
    awayScore: 100.0,
    homeTeam: 'Team A',
    awayTeam: 'Team B',
    result: 'tie',
  },
};

export const HighScoring: Story = {
  args: {
    homeScore: 201.4,
    awayScore: 187.9,
    homeTeam: 'High Scorer',
    awayTeam: 'Also High',
    result: 'win',
  },
};
