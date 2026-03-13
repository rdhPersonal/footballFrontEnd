import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PlayerCardDetailed } from './PlayerCardDetailed';
import type { PlayerData, PlayerStatsData } from './types';

const player: PlayerData = {
  id: '1',
  name: 'Justin Jefferson',
  position: 'WR',
  teamAbbr: 'MIN',
  byeWeek: 6,
};

const stats: PlayerStatsData = {
  gamesPlayed: 14,
  totalPoints: 312.4,
  projectedPoints: 24.6,
};

describe('PlayerCardDetailed', () => {
  describe('Rendering', () => {
    it('renders the player name', () => {
      render(<PlayerCardDetailed player={player} />);
      expect(screen.getByText('Justin Jefferson')).toBeInTheDocument();
    });

    it('renders the position badge', () => {
      render(<PlayerCardDetailed player={player} />);
      expect(screen.getByText('WR')).toBeInTheDocument();
    });

    it('renders the team abbreviation', () => {
      render(<PlayerCardDetailed player={player} />);
      expect(screen.getByText('MIN')).toBeInTheDocument();
    });

    it('renders bye week when provided', () => {
      render(<PlayerCardDetailed player={player} />);
      expect(screen.getByText('Bye 6')).toBeInTheDocument();
    });

    it('does not render bye week when not provided', () => {
      render(<PlayerCardDetailed player={{ ...player, byeWeek: undefined }} />);
      expect(screen.queryByText(/Bye/)).not.toBeInTheDocument();
    });

    it('renders rank when provided', () => {
      render(<PlayerCardDetailed player={player} rank={3} />);
      expect(screen.getByText('#3')).toBeInTheDocument();
    });
  });

  describe('Stats', () => {
    it('renders total points when stats are provided', () => {
      render(<PlayerCardDetailed player={player} stats={stats} />);
      expect(screen.getByText('Fantasy Points')).toBeInTheDocument();
      expect(screen.getByText('312.4')).toBeInTheDocument();
    });

    it('renders projected points', () => {
      render(<PlayerCardDetailed player={player} stats={stats} />);
      expect(screen.getByText('Projected')).toBeInTheDocument();
      expect(screen.getByText('24.6')).toBeInTheDocument();
    });

    it('renders games played', () => {
      render(<PlayerCardDetailed player={player} stats={stats} />);
      expect(screen.getByText('Games Played')).toBeInTheDocument();
      expect(screen.getByText('14')).toBeInTheDocument();
    });

    it('does not render stats section when stats are not provided', () => {
      render(<PlayerCardDetailed player={player} />);
      expect(screen.queryByText('Fantasy Points')).not.toBeInTheDocument();
    });
  });

  describe('Injury status', () => {
    it('shows injury status badge when player is injured', () => {
      render(
        <PlayerCardDetailed
          player={{ ...player, injuryStatus: 'out' }}
        />,
      );
      expect(screen.getByText('Out')).toBeInTheDocument();
    });

    it('does not show injury badge for healthy players', () => {
      render(
        <PlayerCardDetailed
          player={{ ...player, injuryStatus: 'healthy' }}
        />,
      );
      expect(screen.queryByText('Active')).not.toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('renders Add button when onAdd is provided', () => {
      render(<PlayerCardDetailed player={player} onAdd={vi.fn()} />);
      expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('renders Drop button when onDrop is provided', () => {
      render(<PlayerCardDetailed player={player} onDrop={vi.fn()} />);
      expect(screen.getByRole('button', { name: /drop/i })).toBeInTheDocument();
    });

    it('calls onAdd when Add button is clicked', async () => {
      const user = userEvent.setup();
      const onAdd = vi.fn();
      render(<PlayerCardDetailed player={player} onAdd={onAdd} />);
      await user.click(screen.getByRole('button', { name: /add/i }));
      expect(onAdd).toHaveBeenCalledOnce();
    });

    it('calls onDrop when Drop button is clicked', async () => {
      const user = userEvent.setup();
      const onDrop = vi.fn();
      render(<PlayerCardDetailed player={player} onDrop={onDrop} />);
      await user.click(screen.getByRole('button', { name: /drop/i }));
      expect(onDrop).toHaveBeenCalledOnce();
    });

    it('does not render action buttons when neither onAdd nor onDrop is provided', () => {
      render(<PlayerCardDetailed player={player} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <PlayerCardDetailed player={player} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
