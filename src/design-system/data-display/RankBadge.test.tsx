import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RankBadge } from './RankBadge';

describe('RankBadge', () => {
  describe('Rendering', () => {
    it('renders the rank number', () => {
      render(<RankBadge rank={1} />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders double-digit ranks', () => {
      render(<RankBadge rank={42} />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders each size variant without error', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      for (const size of sizes) {
        const { unmount } = render(<RankBadge rank={1} size={size} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('Rank styling', () => {
    it('renders rank 1 with gold styling', () => {
      render(<RankBadge rank={1} />);
      expect(screen.getByText('1').className).toContain('bg-vegas-gold');
    });

    it('renders rank 2 with silver styling', () => {
      render(<RankBadge rank={2} />);
      expect(screen.getByText('2').className).toContain('bg-brew-400');
    });

    it('renders rank 3 with bronze styling', () => {
      render(<RankBadge rank={3} />);
      expect(screen.getByText('3').className).toContain('amber-700');
    });

    it('renders rank 4+ with default styling', () => {
      render(<RankBadge rank={10} />);
      expect(screen.getByText('10').className).toContain('bg-brew-800');
    });
  });

  describe('Accessibility', () => {
    it('has an aria-label with the rank', () => {
      render(<RankBadge rank={5} />);
      expect(screen.getByLabelText('Rank 5')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<RankBadge rank={1} className="custom-class" />);
      expect(screen.getByText('1').className).toContain('custom-class');
    });
  });
});
