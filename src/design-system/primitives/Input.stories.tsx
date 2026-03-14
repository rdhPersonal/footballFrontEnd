import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'Search players...' },
};

export const WithLabel: Story = {
  args: { label: 'Player name', placeholder: 'e.g. Patrick Mahomes' },
};

export const WithHint: Story = {
  args: {
    label: 'Search',
    placeholder: 'e.g. Mahomes',
    hint: 'Search by name, team, or position',
  },
};

export const WithError: Story = {
  args: {
    label: 'Roster name',
    defaultValue: '',
    error: 'Roster name is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'League name',
    defaultValue: 'The Big League',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 w-72">
      <Input label="Default" placeholder="Enter a value" />
      <Input label="With hint" placeholder="Enter a value" hint="This is a helpful hint" />
      <Input label="With error" defaultValue="bad input" error="This value is invalid" />
      <Input label="Disabled" defaultValue="Cannot edit" disabled />
    </div>
  ),
};
