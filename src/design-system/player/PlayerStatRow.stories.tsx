import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlayerStatRow } from './PlayerStatRow';

const meta: Meta<typeof PlayerStatRow> = {
  title: 'Player/PlayerStatRow',
  component: PlayerStatRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PlayerStatRow>;

export const Default: Story = {
  args: { label: 'Total Points', value: '312.4' },
};

export const Highlighted: Story = {
  args: { label: 'Fantasy Points', value: '42.8', highlight: true },
};

export const MultipleRows: Story = {
  render: () => (
    <div className="w-64 rounded-lg border border-brew-700 bg-brew-900 p-3">
      <PlayerStatRow label="Fantasy Points" value="312.4" highlight />
      <PlayerStatRow label="Projected" value="24.6" />
      <PlayerStatRow label="Games Played" value="14" />
      <PlayerStatRow label="Avg / Game" value="22.3" />
      <PlayerStatRow label="Bye Week" value="6" />
    </div>
  ),
};
