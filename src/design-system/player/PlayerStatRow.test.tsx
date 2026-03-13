import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlayerStatRow } from './PlayerStatRow';

describe('PlayerStatRow', () => {
  describe('Rendering', () => {
    it('renders the label', () => {
      render(<PlayerStatRow label="Total Points" value="32.4" />);
      expect(screen.getByText('Total Points')).toBeInTheDocument();
    });

    it('renders the value', () => {
      render(<PlayerStatRow label="Total Points" value="32.4" />);
      expect(screen.getByText('32.4')).toBeInTheDocument();
    });

    it('renders ReactNode as value', () => {
      render(
        <PlayerStatRow
          label="Status"
          value={<span data-testid="custom-value">Active</span>}
        />,
      );
      expect(screen.getByTestId('custom-value')).toBeInTheDocument();
    });
  });

  describe('Highlight variant', () => {
    it('applies gold text when highlight is true', () => {
      render(<PlayerStatRow label="Points" value="42.0" highlight />);
      expect(screen.getByText('42.0').className).toContain('vegas-gold');
    });

    it('applies muted text when highlight is false', () => {
      render(<PlayerStatRow label="Points" value="42.0" />);
      expect(screen.getByText('42.0').className).toContain('brew-200');
    });
  });

  describe('Styling', () => {
    it('applies custom className to the row', () => {
      const { container } = render(
        <PlayerStatRow label="Points" value="42.0" className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
