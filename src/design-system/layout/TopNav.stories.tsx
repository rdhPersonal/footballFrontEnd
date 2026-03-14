import type { Meta, StoryObj } from '@storybook/react';
import { TopNav } from './TopNav';

const meta: Meta<typeof TopNav> = {
  title: 'Layout/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  args: {
    leagueName: 'The Big League',
    user: { name: 'Alex Johnson', email: 'alex@example.com' },
  },
};

export const WithLeagueNameOnly: Story = {
  args: {
    leagueName: 'Dynasty Fantasy 2026',
  },
};

export const WithUserOnly: Story = {
  args: {
    user: { name: 'Marcus Williams', email: 'marcus@example.com' },
  },
};

export const WithoutEmail: Story = {
  args: {
    leagueName: 'My League',
    user: { name: 'Sam Rivera' },
  },
};

export const Minimal: Story = {
  args: {},
};
