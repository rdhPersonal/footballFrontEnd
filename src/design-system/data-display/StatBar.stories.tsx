import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatBar } from './StatBar';

const meta: Meta<typeof StatBar> = {
  title: 'Data Display/StatBar',
  component: StatBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { value: 65, max: 100 },
};

export default meta;
type Story = StoryObj<typeof StatBar>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: 'Points Scored', value: 112, max: 200 },
};

export const WithValue: Story = {
  args: { label: 'Rushing Yards', value: 87, max: 150, showValue: true },
};

export const ColorGold: Story = {
  args: { label: 'Fantasy Points', value: 78, color: 'gold' },
};

export const ColorEmerald: Story = {
  args: { label: 'Win Rate', value: 72, color: 'emerald' },
};

export const ColorCrimson: Story = {
  args: { label: 'Injury Risk', value: 40, color: 'crimson' },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <StatBar value={80} label="Gold" color="gold" />
      <StatBar value={65} label="Emerald" color="emerald" />
      <StatBar value={45} label="Crimson" color="crimson" />
      <StatBar value={55} label="Neon" color="neon" />
      <StatBar value={70} label="Default" color="default" />
    </div>
  ),
};

export const Empty: Story = {
  args: { value: 0, label: 'No points yet' },
};

export const Full: Story = {
  args: { value: 100, label: 'Max reached', color: 'gold' },
};
