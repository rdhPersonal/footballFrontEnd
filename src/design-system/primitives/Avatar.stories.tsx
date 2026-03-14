import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    src: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/3139477.png',
    name: 'Patrick Mahomes',
    size: 'md',
  },
};

export const InitialsFallback: Story = {
  args: {
    name: 'Patrick Mahomes',
    size: 'md',
  },
};

export const SingleName: Story = {
  args: { name: 'Mahomes', size: 'md' },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="Patrick Mahomes" size="sm" />
      <Avatar name="Patrick Mahomes" size="md" />
      <Avatar name="Patrick Mahomes" size="lg" />
      <Avatar name="Patrick Mahomes" size="xl" />
    </div>
  ),
};

export const WithGoldRing: Story = {
  args: {
    name: 'Tyreek Hill',
    size: 'lg',
    className: 'ring-2 ring-vegas-gold ring-offset-2 ring-offset-brew-950',
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar name="Patrick Mahomes" size="md" className="ring-2 ring-brew-950" />
      <Avatar name="Tyreek Hill" size="md" className="ring-2 ring-brew-950" />
      <Avatar name="Justin Jefferson" size="md" className="ring-2 ring-brew-950" />
    </div>
  ),
};
