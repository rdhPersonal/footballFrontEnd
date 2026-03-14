import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    backgrounds: { default: 'brew' },
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { checked: false, label: 'Accept terms and conditions' },
};

export const Checked: Story = {
  args: { checked: true, label: 'Accept terms and conditions' },
};

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true, label: 'Select all' },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, label: 'Unavailable option' },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true, label: 'Locked selection' },
};

export const WithoutLabel: Story = {
  args: { checked: false, 'aria-label': 'Select row' },
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(true);
    const [lg, setLg] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Checkbox checked={sm} onChange={setSm} label="Small" size="sm" />
        <Checkbox checked={md} onChange={setMd} label="Medium (default)" size="md" />
        <Checkbox checked={lg} onChange={setLg} label="Large" size="lg" />
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label={checked ? 'Subscribed to updates' : 'Subscribe to updates'}
      />
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [values, setValues] = useState({ qb: true, rb: false, wr: true, te: false });
    const toggle = (key: keyof typeof values) =>
      setValues((v) => ({ ...v, [key]: !v[key] }));
    const allChecked = Object.values(values).every(Boolean);
    const someChecked = Object.values(values).some(Boolean);

    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          checked={allChecked}
          indeterminate={!allChecked && someChecked}
          onChange={(c) => setValues({ qb: c, rb: c, wr: c, te: c })}
          label="All positions"
        />
        <div className="ml-6 flex flex-col gap-2 border-l border-brew-700 pl-4">
          <Checkbox checked={values.qb} onChange={() => toggle('qb')} label="QB" />
          <Checkbox checked={values.rb} onChange={() => toggle('rb')} label="RB" />
          <Checkbox checked={values.wr} onChange={() => toggle('wr')} label="WR" />
          <Checkbox checked={values.te} onChange={() => toggle('te')} label="TE" />
        </div>
      </div>
    );
  },
};
