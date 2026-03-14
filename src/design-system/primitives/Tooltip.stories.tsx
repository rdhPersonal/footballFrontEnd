import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, HelpCircle, AlertTriangle } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { Badge } from './Badge';
import { IconButton } from './IconButton';
import { Button } from './Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip content="This is a tooltip" delayDuration={0}>
        <button className="rounded-md bg-brew-800 px-4 py-2 text-sm text-brew-200 border border-brew-700">
          Hover me
        </button>
      </Tooltip>
    </div>
  ),
};

export const OverButton: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip content="Add player to your roster" delayDuration={0}>
        <Button variant="primary">Add Player</Button>
      </Tooltip>
    </div>
  ),
};

export const OverIconButton: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip content="Player info" delayDuration={0}>
        <IconButton icon={Info} label="Player info" />
      </Tooltip>
    </div>
  ),
};

export const OverBadge: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip content="Questionable — limited practice Wednesday" delayDuration={0}>
        <Badge variant="status" status="questionable">Q</Badge>
      </Tooltip>
    </div>
  ),
};

export const SideVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-16 place-items-center">
      <Tooltip content="Top tooltip" side="top" delayDuration={0}>
        <button className="rounded-md bg-brew-800 px-3 py-1.5 text-xs text-brew-200 border border-brew-700">
          Top
        </button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right" delayDuration={0}>
        <button className="rounded-md bg-brew-800 px-3 py-1.5 text-xs text-brew-200 border border-brew-700">
          Right
        </button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom" delayDuration={0}>
        <button className="rounded-md bg-brew-800 px-3 py-1.5 text-xs text-brew-200 border border-brew-700">
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left" delayDuration={0}>
        <button className="rounded-md bg-brew-800 px-3 py-1.5 text-xs text-brew-200 border border-brew-700">
          Left
        </button>
      </Tooltip>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip
        content={
          <div className="space-y-1">
            <p className="font-semibold text-brew-50">Patrick Mahomes</p>
            <p className="text-brew-400">KC • QB • 18.4 avg pts</p>
          </div>
        }
        delayDuration={0}
      >
        <button className="rounded-md bg-brew-800 px-4 py-2 text-sm text-brew-200 border border-brew-700">
          Hover for player info
        </button>
      </Tooltip>
    </div>
  ),
};

export const InjuryStatusHelp: Story = {
  render: () => (
    <div className="flex items-center gap-2 p-16">
      <span className="text-sm text-brew-200">Status</span>
      <Tooltip
        content="Injury statuses: OUT (0%), Doubtful (25%), Questionable (50%), Probable (75%)"
        delayDuration={0}
      >
        <span>
          <IconButton icon={HelpCircle} label="Status explanation" size="sm" variant="ghost" />
        </span>
      </Tooltip>
    </div>
  ),
};

export const WarningTooltip: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip
        content="This player has a bye week next week"
        delayDuration={0}
      >
        <span>
          <IconButton icon={AlertTriangle} label="Bye week warning" variant="ghost" />
        </span>
      </Tooltip>
    </div>
  ),
};
