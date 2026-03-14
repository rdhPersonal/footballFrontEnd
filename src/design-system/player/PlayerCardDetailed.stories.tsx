import type { Meta, StoryObj } from '@storybook/react';
import { PlayerCardDetailed } from './PlayerCardDetailed';

const meta: Meta<typeof PlayerCardDetailed> = {
  title: 'Player/PlayerCardDetailed',
  component: PlayerCardDetailed,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PlayerCardDetailed>;

const jefferson = {
  id: '1',
  name: 'Justin Jefferson',
  position: 'WR' as const,
  teamAbbr: 'MIN',
  byeWeek: 6,
};

const stats = {
  gamesPlayed: 14,
  totalPoints: 312.4,
  projectedPoints: 24.6,
  avgPoints: 22.3,
};

const weeklyPoints = [24.6, 18.2, 31.4, 12.8, 28.9, 22.1, 35.6, 19.3, 27.4];

export const Default: Story = {
  args: { player: jefferson },
};

export const WithStats: Story = {
  args: { player: jefferson, stats, rank: 3 },
};

export const WithSparkline: Story = {
  args: { player: jefferson, stats, weeklyPoints, rank: 3 },
};

export const WithActions: Story = {
  args: {
    player: jefferson,
    stats,
    weeklyPoints,
    rank: 3,
    onAdd: () => console.log('add'),
    onDrop: () => console.log('drop'),
  },
};

export const Injured: Story = {
  args: {
    player: {
      ...jefferson,
      injuryStatus: 'questionable' as const,
    },
    stats,
    weeklyPoints,
    onAdd: () => {},
  },
};

export const NoByeWeek: Story = {
  args: { player: { ...jefferson, byeWeek: undefined }, stats },
};
