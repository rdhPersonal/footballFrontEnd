import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const positions = [
  { value: 'qb', label: 'Quarterback' },
  { value: 'rb', label: 'Running Back' },
  { value: 'wr', label: 'Wide Receiver' },
  { value: 'te', label: 'Tight End' },
  { value: 'k', label: 'Kicker' },
  { value: 'def', label: 'Defense' },
];

const weeks = Array.from({ length: 18 }, (_, i) => ({
  value: String(i + 1),
  label: `Week ${i + 1}`,
}));

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

function WithValueStory() {
  const [value, setValue] = useState('wr');
  return (
    <div className="w-56">
      <Select
        options={positions}
        label="Position"
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
}

function WeekSelectorStory() {
  const [week, setWeek] = useState('14');
  return (
    <div className="w-36">
      <Select options={weeks} value={week} onValueChange={setWeek} />
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div className="w-56">
      <Select options={positions} placeholder="Select position" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-56">
      <Select options={positions} label="Position" placeholder="Select position" />
    </div>
  ),
};

export const WithValue: Story = { render: () => <WithValueStory /> };

export const WithError: Story = {
  render: () => (
    <div className="w-56">
      <Select
        options={positions}
        label="Position"
        error="Please select a position"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-56">
      <Select options={positions} label="Position" value="qb" disabled />
    </div>
  ),
};

export const WeekSelector: Story = { render: () => <WeekSelectorStory /> };
