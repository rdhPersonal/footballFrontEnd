import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RosterGrid } from './RosterGrid';
import type { RosterSlotConfig } from './types';

const slots: RosterSlotConfig[] = [
  {
    id: 's1',
    position: 'QB',
    player: { id: 'p1', name: 'Patrick Mahomes', position: 'QB', teamAbbr: 'KC' },
  },
  { id: 's2', position: 'RB' },
  { id: 's3', position: 'WR' },
  { id: 's4', position: 'BN' },
];

describe('RosterGrid', () => {
  describe('Rendering', () => {
    it('renders all slot positions', () => {
      render(<RosterGrid slots={slots} />);
      // QB appears twice: slot label + Mahomes's position badge — use getAllByText
      expect(screen.getAllByText('QB').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('RB')).toBeInTheDocument();
      expect(screen.getByText('WR')).toBeInTheDocument();
      expect(screen.getByText('BN')).toBeInTheDocument();
    });

    it('renders player name when player is in slot', () => {
      render(<RosterGrid slots={slots} />);
      expect(screen.getByText('Patrick Mahomes')).toBeInTheDocument();
    });

    it('renders Bench section label when BN slots are present', () => {
      render(<RosterGrid slots={slots} />);
      expect(screen.getByText('Bench')).toBeInTheDocument();
    });

    it('does not render Bench section when no BN slots', () => {
      const noBeach = slots.filter((s) => s.position !== 'BN');
      render(<RosterGrid slots={noBeach} />);
      expect(screen.queryByText('Bench')).not.toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('calls onAddPlayer with slot id when add is clicked', async () => {
      const user = userEvent.setup();
      const onAddPlayer = vi.fn();
      render(<RosterGrid slots={slots} onAddPlayer={onAddPlayer} />);
      // Click the first empty slot's add button (RB slot)
      await user.click(
        screen.getByRole('button', { name: /add player to RB/i }),
      );
      expect(onAddPlayer).toHaveBeenCalledWith('s2');
    });

    it('calls onDropPlayer with player id when drop is clicked', async () => {
      const user = userEvent.setup();
      const onDropPlayer = vi.fn();
      render(<RosterGrid slots={slots} onDropPlayer={onDropPlayer} />);
      await user.click(
        screen.getByRole('button', { name: /drop Patrick Mahomes/i }),
      );
      expect(onDropPlayer).toHaveBeenCalledWith('p1');
    });
  });

  describe('Styling', () => {
    it('applies custom className to the wrapper', () => {
      const { container } = render(
        <RosterGrid slots={slots} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
