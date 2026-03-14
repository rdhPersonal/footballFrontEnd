import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Layout/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="stats">
      <Tabs.List>
        <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
        <Tabs.Trigger value="history">History</Tabs.Trigger>
        <Tabs.Trigger value="news">News</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="stats">
        <p className="text-brew-200">Weekly and season stats go here.</p>
      </Tabs.Content>
      <Tabs.Content value="history">
        <p className="text-brew-200">Roster history goes here.</p>
      </Tabs.Content>
      <Tabs.Content value="news">
        <p className="text-brew-200">Latest player news goes here.</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const PlayerDetail: Story = {
  render: () => (
    <Tabs defaultValue="stats">
      <Tabs.List>
        <Tabs.Trigger value="stats">Season Stats</Tabs.Trigger>
        <Tabs.Trigger value="weekly">Weekly</Tabs.Trigger>
        <Tabs.Trigger value="projections">Projections</Tabs.Trigger>
        <Tabs.Trigger value="news">News</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="stats">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-brew-400">Passing Yards</span>
            <span className="font-mono text-brew-50">4,183</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brew-400">Touchdowns</span>
            <span className="font-mono text-brew-50">37</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brew-400">Interceptions</span>
            <span className="font-mono text-brew-50">11</span>
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content value="weekly">
        <p className="text-brew-200">Weekly breakdown here.</p>
      </Tabs.Content>
      <Tabs.Content value="projections">
        <p className="text-brew-200">Projection data here.</p>
      </Tabs.Content>
      <Tabs.Content value="news">
        <p className="text-brew-200">Latest news here.</p>
      </Tabs.Content>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="roster">
      <Tabs.List>
        <Tabs.Trigger value="roster">My Roster</Tabs.Trigger>
        <Tabs.Trigger value="waivers">Waivers</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="roster">
        <p className="text-brew-200">Your current roster.</p>
      </Tabs.Content>
      <Tabs.Content value="waivers">
        <p className="text-brew-200">Available waiver wire players.</p>
      </Tabs.Content>
    </Tabs>
  ),
};
