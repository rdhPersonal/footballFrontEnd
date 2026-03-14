import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineupSlot } from './LineupSlot';

const mahomes = { id: '1', name: 'Patrick Mahomes', position: 'QB' as const, teamAbbr: 'KC' };
const injured = { id: '2', name: 'Davante Adams', position: 'WR' as const, teamAbbr: 'LV', injuryStatus: 'questionable' as const };

const meta: Meta<typeof LineupSlot> = {
  title: 'Fantasy/LineupSlot',
  component: LineupSlot,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof LineupSlot>;

export const Empty: Story = {
  args: { position: 'RB', onAddPlayer: () => {} },
};

export const Filled: Story = {
  args: { position: 'QB', player: mahomes, score: 38.2 },
};

export const FilledWithDrop: Story = {
  args: {
    position: 'QB',
    player: mahomes,
    score: 38.2,
    onDropPlayer: () => {},
  },
};

export const Locked: Story = {
  args: { position: 'QB', player: mahomes, score: 38.2, locked: true },
};

export const EmptyLocked: Story = {
  args: { position: 'TE', locked: true, onAddPlayer: () => {} },
};

export const InjuredPlayer: Story = {
  args: { position: 'WR', player: injured, score: 14.2, onDropPlayer: () => {} },
};

export const FullLineup: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-96">
      <LineupSlot position="QB" player={mahomes} score={38.2} onDropPlayer={() => {}} />
      <LineupSlot position="RB" player={{ id: '3', name: 'Christian McCaffrey', position: 'RB', teamAbbr: 'SF' }} score={41.6} onDropPlayer={() => {}} />
      <LineupSlot position="WR" player={injured} score={14.2} onDropPlayer={() => {}} />
      <LineupSlot position="WR" onAddPlayer={() => {}} />
      <LineupSlot position="TE" onAddPlayer={() => {}} />
      <LineupSlot position="FLEX" locked />
      <LineupSlot position="K" player={{ id: '4', name: 'Justin Tucker', position: 'K', teamAbbr: 'BAL' }} score={8.0} />
    </div>
  ),
};
