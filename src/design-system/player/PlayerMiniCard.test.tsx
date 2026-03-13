import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlayerMiniCard } from './PlayerMiniCard';
import type { PlayerData } from './types';

const mahomes: PlayerData = {
  id: '1',
  name: 'Patrick Mahomes',
  position: 'QB',
  teamAbbr: 'KC',
};

const injuredPlayer: PlayerData = {
  id: '2',
  name: 'Davante Adams',
  position: 'WR',
  teamAbbr: 'LV',
  injuryStatus: 'questionable',
};

describe('PlayerMiniCard', () => {
  describe('Rendering', () => {
    it('renders the player name', () => {
      render(<PlayerMiniCard player={mahomes} />);
      expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument();
    });

    it('renders the position badge', () => {
      render(<PlayerMiniCard player={mahomes} />);
      expect(screen.getByText('QB')).toBeInTheDocument();
    });

    it('renders the team abbreviation', () => {
      render(<PlayerMiniCard player={mahomes} />);
      expect(screen.getByText('KC')).toBeInTheDocument();
    });
  });

  describe('Injury status', () => {
    it('shows injury badge when player is questionable', () => {
      render(<PlayerMiniCard player={injuredPlayer} />);
      expect(screen.getByText('Q')).toBeInTheDocument();
    });

    it('shows OUT badge for out status', () => {
      render(
        <PlayerMiniCard
          player={{ ...mahomes, injuryStatus: 'out' }}
        />,
      );
      expect(screen.getByText('OUT')).toBeInTheDocument();
    });

    it('shows IR badge for ir status', () => {
      render(
        <PlayerMiniCard
          player={{ ...mahomes, injuryStatus: 'ir' }}
        />,
      );
      expect(screen.getByText('IR')).toBeInTheDocument();
    });

    it('does not show injury badge when player is healthy', () => {
      render(
        <PlayerMiniCard
          player={{ ...mahomes, injuryStatus: 'healthy' }}
        />,
      );
      expect(screen.queryByText('Q')).not.toBeInTheDocument();
      expect(screen.queryByText('OUT')).not.toBeInTheDocument();
    });

    it('does not show injury badge when injuryStatus is not provided', () => {
      render(<PlayerMiniCard player={mahomes} />);
      expect(screen.queryByText('OUT')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders sm size without error', () => {
      render(<PlayerMiniCard player={mahomes} size="sm" />);
      expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument();
    });

    it('renders md size without error', () => {
      render(<PlayerMiniCard player={mahomes} size="md" />);
      expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <PlayerMiniCard player={mahomes} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
