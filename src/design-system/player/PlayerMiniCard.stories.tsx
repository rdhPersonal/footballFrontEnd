import type { Meta, StoryObj } from '@storybook/react';
import { PlayerMiniCard } from './PlayerMiniCard';

const meta: Meta<typeof PlayerMiniCard> = {
  title: 'Player/PlayerMiniCard',
  component: PlayerMiniCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PlayerMiniCard>;

export const Default: Story = {
  args: {
    player: { id: '1', name: 'Patrick Mahomes', position: 'QB', teamAbbr: 'KC' },
  },
};

export const WithInjury: Story = {
  args: {
    player: {
      id: '2',
      name: 'Davante Adams',
      position: 'WR',
      teamAbbr: 'LV',
      injuryStatus: 'questionable',
    },
  },
};

export const Out: Story = {
  args: {
    player: {
      id: '3',
      name: 'Mark Andrews',
      position: 'TE',
      teamAbbr: 'BAL',
      injuryStatus: 'out',
    },
  },
};

export const SmallSize: Story = {
  args: {
    player: { id: '4', name: 'Christian McCaffrey', position: 'RB', teamAbbr: 'SF' },
    size: 'sm',
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { id: '1', name: 'Lamar Jackson', position: 'QB' as const, teamAbbr: 'BAL' },
        { id: '2', name: 'Derrick Henry', position: 'RB' as const, teamAbbr: 'TEN' },
        { id: '3', name: 'Stefon Diggs', position: 'WR' as const, teamAbbr: 'BUF' },
        { id: '4', name: 'Travis Kelce', position: 'TE' as const, teamAbbr: 'KC' },
        { id: '5', name: 'Justin Tucker', position: 'K' as const, teamAbbr: 'BAL' },
        { id: '6', name: 'SF Defense', position: 'DEF' as const, teamAbbr: 'SF' },
      ].map((p) => (
        <PlayerMiniCard key={p.id} player={p} />
      ))}
    </div>
  ),
};
