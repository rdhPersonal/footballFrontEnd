import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Primitives/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <p className="text-brew-200">Above</p>
      <Divider />
      <p className="text-brew-200">Below</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <p className="text-brew-200">Section A</p>
      <Divider label="OR" />
      <p className="text-brew-200">Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-4">
      <span className="text-brew-200">Left</span>
      <Divider orientation="vertical" />
      <span className="text-brew-200">Right</span>
    </div>
  ),
};
