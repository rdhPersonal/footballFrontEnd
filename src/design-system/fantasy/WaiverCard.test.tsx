import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { WaiverCard } from './WaiverCard';
import type { PlayerData } from '../player/types';

const player: PlayerData = {
  id: 'p1',
  name: 'Puka Nacua',
  position: 'WR',
  teamAbbr: 'LAR',
};

describe('WaiverCard', () => {
  describe('Rendering', () => {
    it('renders the player name', () => {
      render(<WaiverCard player={player} />);
      expect(screen.getByText('Puka Nacua')).toBeInTheDocument();
    });

    it('renders waiver order when provided', () => {
      render(<WaiverCard player={player} waiverOrder={3} />);
      expect(screen.getByText('#3 waiver')).toBeInTheDocument();
    });

    it('does not render waiver order when not provided', () => {
      render(<WaiverCard player={player} />);
      expect(screen.queryByText(/#\d+ waiver/)).not.toBeInTheDocument();
    });

    it('renders FAAB bid when provided', () => {
      render(<WaiverCard player={player} faabBid={28} />);
      expect(screen.getByText('$28 FAAB')).toBeInTheDocument();
    });

    it('does not render FAAB when not provided', () => {
      render(<WaiverCard player={player} />);
      expect(screen.queryByText(/FAAB/)).not.toBeInTheDocument();
    });

    it('renders Add button when onAdd is provided', () => {
      render(<WaiverCard player={player} onAdd={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Add Puka Nacua' })).toBeInTheDocument();
    });

    it('does not render Add button when onAdd is not provided', () => {
      render(<WaiverCard player={player} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onAdd with player id when Add button is clicked', async () => {
      const user = userEvent.setup();
      const onAdd = vi.fn();
      render(<WaiverCard player={player} onAdd={onAdd} />);
      await user.click(screen.getByRole('button', { name: 'Add Puka Nacua' }));
      expect(onAdd).toHaveBeenCalledWith('p1');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <WaiverCard player={player} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
