import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';
import { Card } from './Card';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    children: <p className="text-brew-200">Section content goes here.</p>,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Top Players',
    children: <p className="text-brew-200">Section content goes here.</p>,
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    title: 'Top Players',
    description: 'Ranked by fantasy points this week',
    children: <p className="text-brew-200">Section content goes here.</p>,
  },
};

export const WithCards: Story = {
  render: () => (
    <Section title="Roster" description="Your current lineup">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <Card.Body>Patrick Mahomes — QB</Card.Body>
        </Card>
        <Card>
          <Card.Body>Tyreek Hill — WR</Card.Body>
        </Card>
        <Card>
          <Card.Body>Christian McCaffrey — RB</Card.Body>
        </Card>
      </div>
    </Section>
  ),
};
