import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PlayerCardCompact } from './PlayerCardCompact';
import type { PlayerData } from './types';

const player: PlayerData = {
  id: 'p1',
  name: 'Christian McCaffrey',
  position: 'RB',
  teamAbbr: 'SF',
};

describe('PlayerCardCompact', () => {
  describe('Rendering', () => {
    it('renders the player name', () => {
      render(<PlayerCardCompact player={player} />);
      expect(screen.getByText('Christian McCaffrey')).toBeInTheDocument();
    });

    it('renders position and team', () => {
      render(<PlayerCardCompact player={player} />);
      expect(screen.getByText('RB')).toBeInTheDocument();
      expect(screen.getByText('SF')).toBeInTheDocument();
    });

    it('renders stat value and label when provided', () => {
      render(
        <PlayerCardCompact player={player} statLabel="Pts" statValue="41.6" />,
      );
      expect(screen.getByText('41.6')).toBeInTheDocument();
      expect(screen.getByText('Pts')).toBeInTheDocument();
    });

    it('does not render stat section when statValue is not provided', () => {
      render(<PlayerCardCompact player={player} />);
      expect(screen.queryByText('Pts')).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onSelect with player id when clicked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<PlayerCardCompact player={player} onSelect={onSelect} />);
      await user.click(screen.getByRole('button'));
      expect(onSelect).toHaveBeenCalledWith('p1');
    });

    it('calls onSelect when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<PlayerCardCompact player={player} onSelect={onSelect} />);
      screen.getByRole('button').focus();
      await user.keyboard('{Enter}');
      expect(onSelect).toHaveBeenCalledWith('p1');
    });

    it('calls onSelect when Space key is pressed', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<PlayerCardCompact player={player} onSelect={onSelect} />);
      screen.getByRole('button').focus();
      await user.keyboard(' ');
      expect(onSelect).toHaveBeenCalledWith('p1');
    });

    it('does not have button role when onSelect is not provided', () => {
      render(<PlayerCardCompact player={player} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Selected state', () => {
    it('has aria-pressed=true when selected', () => {
      render(
        <PlayerCardCompact player={player} selected onSelect={vi.fn()} />,
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('has aria-pressed=false when not selected', () => {
      render(
        <PlayerCardCompact player={player} selected={false} onSelect={vi.fn()} />,
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <PlayerCardCompact player={player} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
