import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { WeekSelector } from './WeekSelector';

const meta: Meta<typeof WeekSelector> = {
  title: 'Fantasy/WeekSelector',
  component: WeekSelector,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof WeekSelector>;

export const Default: Story = {
  args: { currentWeek: 7, onWeekChange: () => {} },
};

export const FirstWeek: Story = {
  args: { currentWeek: 1, onWeekChange: () => {} },
};

export const LastWeek: Story = {
  args: { currentWeek: 18, totalWeeks: 18, onWeekChange: () => {} },
};

export const Interactive: Story = {
  render: () => {
    const [week, setWeek] = useState(7);
    return (
      <div className="flex flex-col items-center gap-4">
        <WeekSelector currentWeek={week} onWeekChange={setWeek} />
        <p className="text-sm text-brew-400">
          Viewing week {week} data
        </p>
      </div>
    );
  },
};

export const PlayoffWeeks: Story = {
  args: { currentWeek: 14, minWeek: 14, totalWeeks: 17, onWeekChange: () => {} },
};
