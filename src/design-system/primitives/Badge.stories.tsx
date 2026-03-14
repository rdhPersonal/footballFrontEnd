import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'position', 'status', 'score'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    status: {
      control: 'select',
      options: ['healthy', 'questionable', 'doubtful', 'out', 'ir'],
      if: { arg: 'variant', eq: 'status' },
    },
    tier: {
      control: 'select',
      options: ['elite', 'good', 'average', 'poor'],
      if: { arg: 'variant', eq: 'score' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const PositionBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="position">QB</Badge>
      <Badge variant="position">RB</Badge>
      <Badge variant="position">WR</Badge>
      <Badge variant="position">TE</Badge>
      <Badge variant="position">K</Badge>
      <Badge variant="position">DEF</Badge>
    </div>
  ),
};

export const InjuryStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="status" status="healthy">Active</Badge>
      <Badge variant="status" status="questionable">Q</Badge>
      <Badge variant="status" status="doubtful">D</Badge>
      <Badge variant="status" status="out">OUT</Badge>
      <Badge variant="status" status="ir">IR</Badge>
    </div>
  ),
};

export const ScoreTiers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="score" tier="elite">32.5</Badge>
      <Badge variant="score" tier="good">22.1</Badge>
      <Badge variant="score" tier="average">12.0</Badge>
      <Badge variant="score" tier="poor">4.2</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

export const MediumSize: Story = {
  args: {
    size: 'md',
    variant: 'position',
    children: 'QB',
  },
};
