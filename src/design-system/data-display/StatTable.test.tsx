import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { type ColumnDef } from '@tanstack/react-table';
import { StatTable } from './StatTable';

interface Player {
  name: string;
  position: string;
  points: number;
}

const columns: ColumnDef<Player>[] = [
  { accessorKey: 'name', header: 'Player' },
  { accessorKey: 'position', header: 'Pos' },
  { accessorKey: 'points', header: 'Pts', enableSorting: true },
];

const data: Player[] = [
  { name: 'Patrick Mahomes', position: 'QB', points: 32.4 },
  { name: 'Justin Jefferson', position: 'WR', points: 28.1 },
  { name: 'Christian McCaffrey', position: 'RB', points: 41.6 },
];

describe('StatTable', () => {
  describe('Rendering', () => {
    it('renders a table element', () => {
      render(<StatTable columns={columns} data={data} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders all column headers', () => {
      render(<StatTable columns={columns} data={data} />);
      expect(screen.getByRole('columnheader', { name: /player/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /pos/i })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: /pts/i })).toBeInTheDocument();
    });

    it('renders all data rows', () => {
      render(<StatTable columns={columns} data={data} />);
      expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument();
      expect(screen.getByText('Justin Jefferson')).toBeInTheDocument();
      expect(screen.getByText('Christian McCaffrey')).toBeInTheDocument();
    });

    it('renders empty state message when data is empty', () => {
      render(<StatTable columns={columns} data={[]} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('sorts rows descending on first click (numeric default)', () => {
      render(<StatTable columns={columns} data={data} />);
      // TanStack Table sorts numeric columns descending-first by default
      const ptsSortButton = screen.getByRole('button', { name: /pts/i });
      fireEvent.click(ptsSortButton);

      const rows = screen.getAllByRole('row').slice(1); // skip header row
      expect(rows[0]).toHaveTextContent('41.6'); // highest first
      expect(rows[2]).toHaveTextContent('28.1'); // lowest last
    });

    it('sorts rows ascending on second click', () => {
      render(<StatTable columns={columns} data={data} />);
      const ptsSortButton = screen.getByRole('button', { name: /pts/i });
      fireEvent.click(ptsSortButton); // descending
      fireEvent.click(ptsSortButton); // ascending

      const rows = screen.getAllByRole('row').slice(1);
      expect(rows[0]).toHaveTextContent('28.1'); // lowest first
    });

    it('sets aria-sort="descending" after one click', () => {
      render(<StatTable columns={columns} data={data} />);
      const ptsHeader = screen.getByRole('columnheader', { name: /pts/i });
      fireEvent.click(screen.getByRole('button', { name: /pts/i }));
      expect(ptsHeader).toHaveAttribute('aria-sort', 'descending');
    });

    it('sets aria-sort="ascending" after two clicks', () => {
      render(<StatTable columns={columns} data={data} />);
      const ptsHeader = screen.getByRole('columnheader', { name: /pts/i });
      const ptsSortButton = screen.getByRole('button', { name: /pts/i });
      fireEvent.click(ptsSortButton);
      fireEvent.click(ptsSortButton);
      expect(ptsHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('renders sortable headers as keyboard-focusable buttons', () => {
      render(<StatTable columns={columns} data={data} />);
      expect(screen.getByRole('button', { name: /pts/i })).toBeInTheDocument();
    });

    it('sorts rows when the header button is activated from the keyboard', async () => {
      const user = userEvent.setup();
      render(<StatTable columns={columns} data={data} />);
      const ptsSortButton = screen.getByRole('button', { name: /pts/i });

      ptsSortButton.focus();
      expect(ptsSortButton).toHaveFocus();

      await user.keyboard('[Enter]');

      const rows = screen.getAllByRole('row').slice(1);
      expect(rows[0]).toHaveTextContent('41.6');
      expect(screen.getByRole('columnheader', { name: /pts/i })).toHaveAttribute(
        'aria-sort',
        'descending',
      );
    });
  });

  describe('Pagination', () => {
    const manyPlayers: Player[] = Array.from({ length: 25 }, (_, i) => ({
      name: `Player ${i + 1}`,
      position: 'QB',
      points: i * 2,
    }));

    it('shows pagination controls when data exceeds pageSize', () => {
      render(<StatTable columns={columns} data={manyPlayers} pageSize={10} />);
      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
      expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    });

    it('does not show pagination controls when all data fits on one page', () => {
      render(<StatTable columns={columns} data={data} />);
      expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
    });

    it('navigates to next page when next button is clicked', async () => {
      const user = userEvent.setup();
      render(<StatTable columns={columns} data={manyPlayers} pageSize={10} />);
      await user.click(screen.getByLabelText('Next page'));
      expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    });

    it('disables previous button on first page', () => {
      render(<StatTable columns={columns} data={manyPlayers} pageSize={10} />);
      expect(screen.getByLabelText('Previous page')).toBeDisabled();
    });
  });

  describe('Styling', () => {
    it('applies custom className to the wrapper', () => {
      const { container } = render(
        <StatTable columns={columns} data={data} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
