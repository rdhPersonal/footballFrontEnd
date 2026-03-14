import type { Meta, StoryObj } from '@storybook/react-vite';
import { RankBadge } from './RankBadge';

const meta: Meta<typeof RankBadge> = {
  title: 'Data Display/RankBadge',
  component: RankBadge,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof RankBadge>;

export const First: Story = {
  args: { rank: 1 },
};

export const Second: Story = {
  args: { rank: 2 },
};

export const Third: Story = {
  args: { rank: 3 },
};

export const Default: Story = {
  args: { rank: 10 },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <RankBadge rank={1} size="sm" />
      <RankBadge rank={1} size="md" />
      <RankBadge rank={1} size="lg" />
    </div>
  ),
};

export const TopTen: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => (
        <RankBadge key={rank} rank={rank} />
      ))}
    </div>
  ),
};
