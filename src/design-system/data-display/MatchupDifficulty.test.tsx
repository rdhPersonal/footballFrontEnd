import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MatchupDifficulty } from './MatchupDifficulty';

describe('MatchupDifficulty', () => {
  describe('Rendering', () => {
    it('renders a difficulty label', () => {
      render(<MatchupDifficulty difficulty={1} />);
      expect(screen.getByText('Very Easy')).toBeInTheDocument();
    });

    it('renders the correct label for each difficulty level', () => {
      const labels: [1 | 2 | 3 | 4 | 5, string][] = [
        [1, 'Very Easy'],
        [2, 'Easy'],
        [3, 'Moderate'],
        [4, 'Hard'],
        [5, 'Very Hard'],
      ];
      for (const [difficulty, label] of labels) {
        const { unmount } = render(<MatchupDifficulty difficulty={difficulty} />);
        expect(screen.getByText(label)).toBeInTheDocument();
        unmount();
      }
    });

    it('renders 5 indicator dots', () => {
      const { container } = render(<MatchupDifficulty difficulty={3} />);
      // 5 dot divs inside the role="img" container
      const img = container.querySelector('[role="img"]');
      expect(img?.children).toHaveLength(5);
    });

    it('renders optional label prop', () => {
      render(<MatchupDifficulty difficulty={2} label="vs DAL" />);
      expect(screen.getByText('vs DAL')).toBeInTheDocument();
    });

    it('does not render label span when label is not provided', () => {
      render(<MatchupDifficulty difficulty={2} />);
      expect(screen.queryByText('vs DAL')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has an aria-label on the outer container', () => {
      render(<MatchupDifficulty difficulty={4} />);
      expect(screen.getByLabelText('Matchup difficulty: Hard')).toBeInTheDocument();
    });

    it('dot group has role="img" with difficulty label', () => {
      render(<MatchupDifficulty difficulty={2} />);
      expect(screen.getByRole('img', { name: 'Easy' })).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <MatchupDifficulty difficulty={3} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
