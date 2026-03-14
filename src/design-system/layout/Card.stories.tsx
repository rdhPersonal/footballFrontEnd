import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Body>Simple card with just a body.</Card.Body>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <span className="text-lg font-semibold text-brew-50">Card Title</span>
      </Card.Header>
      <Card.Body>
        <p className="text-brew-200">Card body content goes here.</p>
      </Card.Body>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <span className="text-lg font-semibold text-brew-50">Player Stats</span>
        <span className="text-sm text-brew-400">Week 14</span>
      </Card.Header>
      <Card.Body>
        <p className="text-brew-200">Detailed stats content.</p>
      </Card.Body>
      <Card.Footer>
        <span className="text-xs text-brew-400">Last updated 2 hours ago</span>
      </Card.Footer>
    </Card>
  ),
};

export const Nested: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <span className="text-lg font-semibold text-brew-50">Roster</span>
      </Card.Header>
      <Card.Body className="space-y-3">
        <Card className="bg-brew-800">
          <Card.Body>Player A</Card.Body>
        </Card>
        <Card className="bg-brew-800">
          <Card.Body>Player B</Card.Body>
        </Card>
      </Card.Body>
    </Card>
  ),
};
