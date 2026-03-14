import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ColumnDef } from '@tanstack/react-table';
import { StatTable } from './StatTable';

interface PlayerRow {
  rank: number;
  name: string;
  team: string;
  position: string;
  points: number;
  projected: number;
  trend: string;
}

const columns: ColumnDef<PlayerRow>[] = [
  { accessorKey: 'rank', header: '#', enableSorting: false },
  { accessorKey: 'name', header: 'Player', enableSorting: false },
  { accessorKey: 'team', header: 'Team', enableSorting: false },
  { accessorKey: 'position', header: 'Pos', enableSorting: false },
  { accessorKey: 'points', header: 'Pts', enableSorting: true },
  { accessorKey: 'projected', header: 'Proj', enableSorting: true },
];

const data: PlayerRow[] = [
  { rank: 1, name: 'Christian McCaffrey', team: 'SF', position: 'RB', points: 41.6, projected: 28.4, trend: '↑' },
  { rank: 2, name: 'Patrick Mahomes', team: 'KC', position: 'QB', points: 38.2, projected: 32.1, trend: '↑' },
  { rank: 3, name: 'Justin Jefferson', team: 'MIN', position: 'WR', points: 35.8, projected: 24.6, trend: '→' },
  { rank: 4, name: 'Tyreek Hill', team: 'MIA', position: 'WR', points: 32.1, projected: 22.8, trend: '↑' },
  { rank: 5, name: 'Travis Kelce', team: 'KC', position: 'TE', points: 28.4, projected: 19.2, trend: '↓' },
  { rank: 6, name: 'Stefon Diggs', team: 'BUF', position: 'WR', points: 26.9, projected: 18.4, trend: '→' },
  { rank: 7, name: 'Davante Adams', team: 'LV', position: 'WR', points: 24.3, projected: 17.1, trend: '↓' },
  { rank: 8, name: 'Mark Andrews', team: 'BAL', position: 'TE', points: 22.8, projected: 16.3, trend: '↑' },
];

// Storybook can't infer concrete args for the generic table component, so we bind it to PlayerRow here.
function PlayerStatTable(props: React.ComponentProps<typeof StatTable<PlayerRow>>): React.ReactElement {
  return <StatTable<PlayerRow> {...props} />;
}

const meta: Meta<typeof PlayerStatTable> = {
  title: 'Data Display/StatTable',
  component: PlayerStatTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof PlayerStatTable>;

export const Default: Story = {
  args: { columns, data },
};

export const Empty: Story = {
  args: { columns, data: [] },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: Array.from({ length: 30 }, (_, i) => ({
      rank: i + 1,
      name: `Player ${i + 1}`,
      team: 'NFL',
      position: 'QB',
      points: Math.round((40 - i * 0.8) * 10) / 10,
      projected: Math.round((32 - i * 0.5) * 10) / 10,
      trend: '→',
    })),
    pageSize: 10,
  },
};
