import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle checked={checked} onCheckedChange={setChecked} />;
  },
};

export const On: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Toggle checked={checked} onCheckedChange={setChecked} />;
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Toggle checked={checked} onCheckedChange={setChecked} label="Email notifications" />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <Toggle checked={false} onCheckedChange={() => {}} label="Disabled off" disabled />
      <Toggle checked={true} onCheckedChange={() => {}} label="Disabled on" disabled />
    </div>
  ),
};

export const SettingsGroup: Story = {
  render: () => {
    const [email, setEmail] = useState(true);
    const [push, setPush] = useState(false);
    const [sms, setSms] = useState(true);
    return (
      <div className="space-y-3 rounded-lg bg-brew-900 border border-brew-700 p-5 w-72">
        <p className="text-sm font-semibold text-brew-50 mb-4">Notifications</p>
        <Toggle checked={email} onCheckedChange={setEmail} label="Email alerts" />
        <Toggle checked={push} onCheckedChange={setPush} label="Push notifications" />
        <Toggle checked={sms} onCheckedChange={setSms} label="SMS updates" />
      </div>
    );
  },
};
