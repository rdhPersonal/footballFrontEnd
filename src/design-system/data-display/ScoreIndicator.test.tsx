import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScoreIndicator } from './ScoreIndicator';

describe('ScoreIndicator', () => {
  describe('Rendering', () => {
    it('renders home and away scores', () => {
      render(<ScoreIndicator homeScore={112.5} awayScore={98.3} />);
      expect(screen.getByText('112.50')).toBeInTheDocument();
      expect(screen.getByText('98.30')).toBeInTheDocument();
    });

    it('renders team names when provided', () => {
      render(
        <ScoreIndicator
          homeScore={100}
          awayScore={90}
          homeTeam="Team Alpha"
          awayTeam="Team Beta"
        />,
      );
      expect(screen.getByText('Team Alpha')).toBeInTheDocument();
      expect(screen.getByText('Team Beta')).toBeInTheDocument();
    });

    it('does not render team names when not provided', () => {
      render(<ScoreIndicator homeScore={100} awayScore={90} />);
      expect(screen.queryByText('Team Alpha')).not.toBeInTheDocument();
    });
  });

  describe('Result variants', () => {
    it('renders win result without error', () => {
      render(<ScoreIndicator homeScore={110} awayScore={95} result="win" />);
      expect(screen.getByText('110.00')).toBeInTheDocument();
    });

    it('renders loss result without error', () => {
      render(<ScoreIndicator homeScore={85} awayScore={102} result="loss" />);
      expect(screen.getByText('85.00')).toBeInTheDocument();
    });

    it('renders tie result without error', () => {
      render(<ScoreIndicator homeScore={100} awayScore={100} result="tie" />);
      expect(screen.getAllByText('100.00')).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('has an aria-label with score information', () => {
      render(
        <ScoreIndicator
          homeScore={112.5}
          awayScore={98.3}
          homeTeam="Team Alpha"
          awayTeam="Team Beta"
        />,
      );
      expect(
        screen.getByLabelText('Score: Team Alpha 112.5 – 98.3 Team Beta'),
      ).toBeInTheDocument();
    });

    it('has a fallback aria-label when no team names provided', () => {
      render(<ScoreIndicator homeScore={100} awayScore={90} />);
      expect(screen.getByLabelText('Score: Home 100 – 90 Away')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <ScoreIndicator homeScore={100} awayScore={90} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
