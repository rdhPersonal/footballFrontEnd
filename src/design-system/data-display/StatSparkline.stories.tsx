import type { Meta, StoryObj } from '@storybook/react';
import { StatSparkline } from './StatSparkline';

const weeklyPoints = [24.6, 18.2, 31.4, 12.8, 28.9, 22.1, 35.6, 19.3, 27.4];

const meta: Meta<typeof StatSparkline> = {
  title: 'Data Display/StatSparkline',
  component: StatSparkline,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { data: weeklyPoints },
};

export default meta;
type Story = StoryObj<typeof StatSparkline>;

export const Default: Story = {};

export const ColorGold: Story = {
  args: { color: 'gold' },
};

export const ColorEmerald: Story = {
  args: { color: 'emerald', data: [10, 14, 18, 22, 26, 30, 35] },
};

export const ColorCrimson: Story = {
  args: { color: 'crimson', data: [35, 28, 20, 15, 10, 6, 2] },
};

export const Large: Story = {
  args: { width: 160, height: 48, color: 'gold' },
};

export const Small: Story = {
  args: { width: 48, height: 20 },
};

export const FlatLine: Story = {
  args: { data: [20, 20, 20, 20, 20] },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['gold', 'emerald', 'crimson', 'default'] as const).map((color) => (
        <div key={color} className="flex items-center gap-3">
          <span className="w-16 text-xs text-brew-400">{color}</span>
          <StatSparkline data={weeklyPoints} color={color} width={100} height={32} />
        </div>
      ))}
    </div>
  ),
};
