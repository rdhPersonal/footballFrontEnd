import type { Meta, StoryObj } from '@storybook/react-vite';
import { X, Plus, Trash2, Settings, ChevronDown, RefreshCw } from 'lucide-react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Primitives/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { icon: X, label: 'Close' },
};

export const Primary: Story = {
  args: { icon: Plus, label: 'Add player', variant: 'primary' },
};

export const Secondary: Story = {
  args: { icon: Settings, label: 'Settings', variant: 'secondary' },
};

export const Ghost: Story = {
  args: { icon: X, label: 'Dismiss', variant: 'ghost' },
};

export const Danger: Story = {
  args: { icon: Trash2, label: 'Delete', variant: 'danger' },
};

export const Loading: Story = {
  args: { icon: RefreshCw, label: 'Refresh', loading: true },
};

export const Disabled: Story = {
  args: { icon: X, label: 'Close', disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton icon={Plus} label="Add" variant="primary" />
      <IconButton icon={Settings} label="Settings" variant="secondary" />
      <IconButton icon={X} label="Dismiss" variant="ghost" />
      <IconButton icon={Trash2} label="Delete" variant="danger" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton icon={X} label="Small" size="sm" />
      <IconButton icon={X} label="Medium" size="md" />
      <IconButton icon={X} label="Large" size="lg" />
    </div>
  ),
};

export const ModalCloseButton: Story = {
  render: () => (
    <div className="relative flex w-72 items-start justify-between rounded-lg bg-brew-800 border border-brew-700 p-4">
      <span className="text-brew-50 font-semibold">Modal Title</span>
      <IconButton icon={X} label="Close modal" variant="ghost" size="sm" />
    </div>
  ),
};

export const TableActions: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <IconButton icon={ChevronDown} label="Expand row" variant="ghost" size="sm" />
      <IconButton icon={Trash2} label="Remove player" variant="ghost" size="sm" />
    </div>
  ),
};
