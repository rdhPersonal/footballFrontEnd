import type { Meta, StoryObj } from '@storybook/react-vite';
import { RosterGrid } from './RosterGrid';
import type { RosterSlotConfig } from './types';

const slots: RosterSlotConfig[] = [
  { id: 's1', position: 'QB', player: { id: 'p1', name: 'Patrick Mahomes', position: 'QB', teamAbbr: 'KC' }, score: 38.2 },
  { id: 's2', position: 'RB', player: { id: 'p2', name: 'Christian McCaffrey', position: 'RB', teamAbbr: 'SF' }, score: 41.6 },
  { id: 's3', position: 'RB' },
  { id: 's4', position: 'WR', player: { id: 'p3', name: 'Justin Jefferson', position: 'WR', teamAbbr: 'MIN' }, score: 28.9 },
  { id: 's5', position: 'WR', player: { id: 'p4', name: 'Tyreek Hill', position: 'WR', teamAbbr: 'MIA', injuryStatus: 'questionable' }, score: 16.4 },
  { id: 's6', position: 'TE' },
  { id: 's7', position: 'FLEX' },
  { id: 's8', position: 'K', player: { id: 'p5', name: 'Justin Tucker', position: 'K', teamAbbr: 'BAL' }, score: 8.0 },
  { id: 's9', position: 'DEF' },
  { id: 'b1', position: 'BN', player: { id: 'p6', name: 'Travis Kelce', position: 'TE', teamAbbr: 'KC' }, score: 22.1 },
  { id: 'b2', position: 'BN' },
];

const meta: Meta<typeof RosterGrid> = {
  title: 'Fantasy/RosterGrid',
  component: RosterGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof RosterGrid>;

export const Default: Story = {
  args: { slots },
};

export const WithActions: Story = {
  args: {
    slots,
    onAddPlayer: (slotId) => console.log('add to slot:', slotId),
    onDropPlayer: (playerId) => console.log('drop player:', playerId),
  },
};

export const Empty: Story = {
  args: {
    slots: slots.map((s) => ({ ...s, player: undefined, score: undefined })),
    onAddPlayer: () => {},
  },
};
