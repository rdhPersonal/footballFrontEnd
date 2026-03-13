import type { Meta, StoryObj } from '@storybook/react';
import { PlayerCompareTray } from './PlayerCompareTray';

const meta: Meta<typeof PlayerCompareTray> = {
  title: 'Player/PlayerCompareTray',
  component: PlayerCompareTray,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PlayerCompareTray>;

const playerA = { id: '1', name: 'Patrick Mahomes', position: 'QB' as const, teamAbbr: 'KC' };
const playerB = { id: '2', name: 'Josh Allen', position: 'QB' as const, teamAbbr: 'BUF' };

const statsA = { gamesPlayed: 16, totalPoints: 412.8, projectedPoints: 32.1, avgPoints: 25.8 };
const statsB = { gamesPlayed: 16, totalPoints: 398.4, projectedPoints: 30.8, avgPoints: 24.9 };

const weeklyA = [28.4, 22.1, 38.6, 18.9, 32.4, 24.7, 41.2, 20.3, 35.1];
const weeklyB = [24.1, 30.8, 28.2, 22.6, 36.9, 18.4, 32.7, 26.1, 29.8];

export const Default: Story = {
  args: { playerA, playerB },
};

export const WithStats: Story = {
  args: { playerA, playerB, statsA, statsB },
};

export const WithSparklines: Story = {
  args: {
    playerA,
    playerB,
    statsA,
    statsB,
    weeklyPointsA: weeklyA,
    weeklyPointsB: weeklyB,
  },
};

export const WithClose: Story = {
  args: {
    playerA,
    playerB,
    statsA,
    statsB,
    weeklyPointsA: weeklyA,
    weeklyPointsB: weeklyB,
    onClose: () => console.log('close'),
  },
};

export const NoStats: Story = {
  args: { playerA, playerB },
};
