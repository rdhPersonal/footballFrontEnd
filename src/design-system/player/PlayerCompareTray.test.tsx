import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PlayerCompareTray } from './PlayerCompareTray';
import type { PlayerData, PlayerStatsData } from './types';

const playerA: PlayerData = {
  id: '1',
  name: 'Patrick Mahomes',
  position: 'QB',
  teamAbbr: 'KC',
};

const playerB: PlayerData = {
  id: '2',
  name: 'Josh Allen',
  position: 'QB',
  teamAbbr: 'BUF',
};

const statsA: PlayerStatsData = {
  gamesPlayed: 16,
  totalPoints: 412.8,
  projectedPoints: 32.1,
};

const statsB: PlayerStatsData = {
  gamesPlayed: 16,
  totalPoints: 398.4,
  projectedPoints: 30.8,
};

describe('PlayerCompareTray', () => {
  describe('Rendering', () => {
    it('renders both player names', () => {
      render(<PlayerCompareTray playerA={playerA} playerB={playerB} />);
      expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument();
      expect(screen.getByText('Josh Allen')).toBeInTheDocument();
    });

    it('renders the Compare Players heading', () => {
      render(<PlayerCompareTray playerA={playerA} playerB={playerB} />);
      expect(screen.getByText('Compare Players')).toBeInTheDocument();
    });

    it('has region role with accessible name', () => {
      render(<PlayerCompareTray playerA={playerA} playerB={playerB} />);
      expect(
        screen.getByRole('region', { name: 'Player comparison' }),
      ).toBeInTheDocument();
    });
  });

  describe('Stats comparison', () => {
    it('renders stat labels when both stats are provided', () => {
      render(
        <PlayerCompareTray
          playerA={playerA}
          playerB={playerB}
          statsA={statsA}
          statsB={statsB}
        />,
      );
      expect(screen.getByText('Pts')).toBeInTheDocument();
      expect(screen.getByText('Proj')).toBeInTheDocument();
      expect(screen.getByText('GP')).toBeInTheDocument();
    });

    it('shows no stats message when stats are not provided', () => {
      render(<PlayerCompareTray playerA={playerA} playerB={playerB} />);
      expect(screen.getByText('No stats available')).toBeInTheDocument();
    });
  });

  describe('Close button', () => {
    it('renders close button when onClose is provided', () => {
      render(
        <PlayerCompareTray
          playerA={playerA}
          playerB={playerB}
          onClose={vi.fn()}
        />,
      );
      expect(
        screen.getByRole('button', { name: 'Close comparison' }),
      ).toBeInTheDocument();
    });

    it('does not render close button when onClose is not provided', () => {
      render(<PlayerCompareTray playerA={playerA} playerB={playerB} />);
      expect(
        screen.queryByRole('button', { name: 'Close comparison' }),
      ).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <PlayerCompareTray
          playerA={playerA}
          playerB={playerB}
          onClose={onClose}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Close comparison' }));
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <PlayerCompareTray
          playerA={playerA}
          playerB={playerB}
          className="custom-class"
        />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
