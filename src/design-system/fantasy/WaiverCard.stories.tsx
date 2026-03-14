import type { Meta, StoryObj } from '@storybook/react-vite';
import { WaiverCard } from './WaiverCard';

const meta: Meta<typeof WaiverCard> = {
  title: 'Fantasy/WaiverCard',
  component: WaiverCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof WaiverCard>;

const nacua = { id: '1', name: 'Puka Nacua', position: 'WR' as const, teamAbbr: 'LAR' };
const henry = { id: '2', name: 'Derrick Henry', position: 'RB' as const, teamAbbr: 'TEN', injuryStatus: 'questionable' as const };

export const Default: Story = {
  args: { player: nacua },
};

export const WithWaiverOrder: Story = {
  args: { player: nacua, waiverOrder: 3 },
};

export const WithFaab: Story = {
  args: { player: nacua, waiverOrder: 3, faabBid: 28 },
};

export const WithAdd: Story = {
  args: {
    player: nacua,
    waiverOrder: 3,
    faabBid: 28,
    onAdd: (id) => console.log('add player:', id),
  },
};

export const InjuredPlayer: Story = {
  args: { player: henry, waiverOrder: 1, faabBid: 45, onAdd: () => {} },
};

export const WaiverList: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-96">
      <WaiverCard player={nacua} waiverOrder={1} faabBid={42} onAdd={() => {}} />
      <WaiverCard player={henry} waiverOrder={2} faabBid={28} onAdd={() => {}} />
      <WaiverCard
        player={{ id: '3', name: 'Sam LaPorta', position: 'TE', teamAbbr: 'DET' }}
        waiverOrder={3}
        faabBid={15}
        onAdd={() => {}}
      />
    </div>
  ),
};
