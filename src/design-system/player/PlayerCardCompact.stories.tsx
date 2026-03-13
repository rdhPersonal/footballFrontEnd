import type { Meta, StoryObj } from '@storybook/react';
import { PlayerCardCompact } from './PlayerCardCompact';

const meta: Meta<typeof PlayerCardCompact> = {
  title: 'Player/PlayerCardCompact',
  component: PlayerCardCompact,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PlayerCardCompact>;

const mahomes = { id: '1', name: 'Patrick Mahomes', position: 'QB' as const, teamAbbr: 'KC' };
const cmc = { id: '2', name: 'Christian McCaffrey', position: 'RB' as const, teamAbbr: 'SF' };

export const Default: Story = {
  args: { player: mahomes },
};

export const WithStat: Story = {
  args: { player: mahomes, statLabel: 'Pts', statValue: '38.2' },
};

export const Selectable: Story = {
  args: {
    player: mahomes,
    statLabel: 'Pts',
    statValue: '38.2',
    onSelect: (id) => console.log('selected:', id),
  },
};

export const Selected: Story = {
  args: {
    player: mahomes,
    statLabel: 'Pts',
    statValue: '38.2',
    selected: true,
    onSelect: (id) => console.log('selected:', id),
  },
};

export const WithInjury: Story = {
  args: {
    player: {
      id: '3',
      name: 'Davante Adams',
      position: 'WR' as const,
      teamAbbr: 'LV',
      injuryStatus: 'questionable' as const,
    },
    statLabel: 'Pts',
    statValue: '18.4',
  },
};

export const RosterList: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <PlayerCardCompact
        player={mahomes}
        statLabel="Pts"
        statValue="38.2"
        onSelect={() => {}}
      />
      <PlayerCardCompact
        player={cmc}
        statLabel="Pts"
        statValue="41.6"
        selected
        onSelect={() => {}}
      />
      <PlayerCardCompact
        player={{ id: '3', name: 'Justin Jefferson', position: 'WR', teamAbbr: 'MIN' }}
        statLabel="Pts"
        statValue="28.9"
        onSelect={() => {}}
      />
    </div>
  ),
};
