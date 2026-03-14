import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LineupSlot } from './LineupSlot';
import type { PlayerData } from '../player/types';

const mahomes: PlayerData = {
  id: 'p1',
  name: 'Patrick Mahomes',
  position: 'QB',
  teamAbbr: 'KC',
};

describe('LineupSlot', () => {
  describe('Rendering', () => {
    it('renders the position label', () => {
      render(<LineupSlot position="QB" />);
      expect(screen.getByText('QB')).toBeInTheDocument();
    });

    it('renders player name when player is provided', () => {
      render(<LineupSlot position="QB" player={mahomes} />);
      expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument();
    });

    it('shows Empty when no player is provided', () => {
      render(<LineupSlot position="RB" />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    it('renders score when player and score are provided', () => {
      render(<LineupSlot position="QB" player={mahomes} score={38.2} />);
      expect(screen.getByText('38.20')).toBeInTheDocument();
    });

    it('does not render score when no player', () => {
      render(<LineupSlot position="QB" score={38.2} />);
      expect(screen.queryByText('38.20')).not.toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('shows add button on empty slot when onAddPlayer is provided', () => {
      render(
        <LineupSlot position="RB" onAddPlayer={vi.fn()} />,
      );
      expect(
        screen.getByRole('button', { name: /add player to RB/i }),
      ).toBeInTheDocument();
    });

    it('calls onAddPlayer when add button is clicked', async () => {
      const user = userEvent.setup();
      const onAddPlayer = vi.fn();
      render(<LineupSlot position="RB" onAddPlayer={onAddPlayer} />);
      await user.click(screen.getByRole('button', { name: /add player to RB/i }));
      expect(onAddPlayer).toHaveBeenCalledOnce();
    });

    it('shows drop button when player is set and onDropPlayer is provided', () => {
      render(
        <LineupSlot position="QB" player={mahomes} onDropPlayer={vi.fn()} />,
      );
      expect(
        screen.getByRole('button', { name: /drop Patrick Mahomes/i }),
      ).toBeInTheDocument();
    });

    it('calls onDropPlayer with player id when drop button is clicked', async () => {
      const user = userEvent.setup();
      const onDropPlayer = vi.fn();
      render(
        <LineupSlot position="QB" player={mahomes} onDropPlayer={onDropPlayer} />,
      );
      await user.click(
        screen.getByRole('button', { name: /drop Patrick Mahomes/i }),
      );
      expect(onDropPlayer).toHaveBeenCalledWith('p1');
    });
  });

  describe('Locked state', () => {
    it('shows lock icon when locked', () => {
      render(<LineupSlot position="QB" player={mahomes} locked />);
      expect(screen.getByLabelText('Locked')).toBeInTheDocument();
    });

    it('does not show add button when locked and empty', () => {
      render(<LineupSlot position="RB" locked onAddPlayer={vi.fn()} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('does not show drop button when locked', () => {
      render(
        <LineupSlot position="QB" player={mahomes} locked onDropPlayer={vi.fn()} />,
      );
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has an aria-label describing the slot', () => {
      render(<LineupSlot position="QB" player={mahomes} />);
      expect(
        screen.getByLabelText('QB slot: Patrick Mahomes'),
      ).toBeInTheDocument();
    });

    it('has an aria-label for empty slot', () => {
      render(<LineupSlot position="RB" />);
      expect(screen.getByLabelText('RB slot: empty')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <LineupSlot position="QB" className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
