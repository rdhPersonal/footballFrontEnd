import type { Meta, StoryObj } from '@storybook/react-vite';
import { MatchupDifficulty } from './MatchupDifficulty';

const meta: Meta<typeof MatchupDifficulty> = {
  title: 'Data Display/MatchupDifficulty',
  component: MatchupDifficulty,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof MatchupDifficulty>;

export const VeryEasy: Story = { args: { difficulty: 1 } };
export const Easy: Story = { args: { difficulty: 2 } };
export const Moderate: Story = { args: { difficulty: 3 } };
export const Hard: Story = { args: { difficulty: 4 } };
export const VeryHard: Story = { args: { difficulty: 5 } };

export const WithLabel: Story = {
  args: { difficulty: 3, label: 'vs DAL' },
};

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {([1, 2, 3, 4, 5] as const).map((level) => (
        <MatchupDifficulty key={level} difficulty={level} label={`vs Opponent ${level}`} />
      ))}
    </div>
  ),
};
