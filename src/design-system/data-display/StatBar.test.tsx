import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatBar } from './StatBar';

describe('StatBar', () => {
  describe('Rendering', () => {
    it('renders a progressbar', () => {
      render(<StatBar value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<StatBar value={50} label="Points" />);
      expect(screen.getByText('Points')).toBeInTheDocument();
    });

    it('does not render label text when not provided', () => {
      render(<StatBar value={50} />);
      // No label span — only the progressbar
      expect(screen.queryByText('Points')).not.toBeInTheDocument();
    });

    it('renders value/max text when showValue is true', () => {
      render(<StatBar value={75} max={100} showValue />);
      expect(screen.getByText('75/100')).toBeInTheDocument();
    });

    it('does not render value text when showValue is false', () => {
      render(<StatBar value={75} max={100} />);
      expect(screen.queryByText('75/100')).not.toBeInTheDocument();
    });
  });

  describe('ARIA', () => {
    it('sets aria-valuenow', () => {
      render(<StatBar value={60} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60');
    });

    it('sets aria-valuemin to 0', () => {
      render(<StatBar value={60} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
    });

    it('sets aria-valuemax to the max prop', () => {
      render(<StatBar value={60} max={200} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200');
    });

    it('sets aria-label from the label prop', () => {
      render(<StatBar value={60} label="Rushing yards" />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Rushing yards');
    });
  });

  describe('Clamping', () => {
    it('clamps value above max to max', () => {
      render(<StatBar value={150} max={100} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps negative value to 0', () => {
      render(<StatBar value={-10} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });
  });

  describe('Color variants', () => {
    it('renders each color variant without error', () => {
      const colors = ['gold', 'emerald', 'crimson', 'neon', 'default'] as const;
      for (const color of colors) {
        const { unmount } = render(<StatBar value={50} color={color} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<StatBar value={50} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
