import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MatchupCard } from './MatchupCard';

const homeTeam = { name: 'Team Alpha', score: 112.5, record: '8-5' };
const awayTeam = { name: "Jeff's Squad", score: 98.3, record: '6-7' };

describe('MatchupCard', () => {
  describe('Rendering', () => {
    it('renders both team names', () => {
      render(
        <MatchupCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          week={14}
          status="final"
        />,
      );
      expect(screen.getByText('Team Alpha')).toBeInTheDocument();
      expect(screen.getByText("Jeff's Squad")).toBeInTheDocument();
    });

    it('renders the week number', () => {
      render(
        <MatchupCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          week={14}
          status="final"
        />,
      );
      expect(screen.getByText('Week 14')).toBeInTheDocument();
    });

    it('renders scores when provided', () => {
      render(
        <MatchupCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          week={14}
          status="final"
        />,
      );
      expect(screen.getByText('112.50')).toBeInTheDocument();
      expect(screen.getByText('98.30')).toBeInTheDocument();
    });

    it('renders team records when provided', () => {
      render(
        <MatchupCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          week={14}
          status="final"
        />,
      );
      expect(screen.getByText('8-5')).toBeInTheDocument();
      expect(screen.getByText('6-7')).toBeInTheDocument();
    });
  });

  describe('Status variants', () => {
    it('renders Final status', () => {
      render(
        <MatchupCard homeTeam={homeTeam} awayTeam={awayTeam} week={14} status="final" />,
      );
      expect(screen.getByText('Final')).toBeInTheDocument();
    });

    it('renders Live status', () => {
      render(
        <MatchupCard homeTeam={homeTeam} awayTeam={awayTeam} week={14} status="live" />,
      );
      expect(screen.getByText('Live')).toBeInTheDocument();
    });

    it('renders Upcoming status', () => {
      render(
        <MatchupCard homeTeam={homeTeam} awayTeam={awayTeam} week={14} status="upcoming" />,
      );
      expect(screen.getByText('Upcoming')).toBeInTheDocument();
    });
  });

  describe('User team indicator', () => {
    it('shows "Your Team" label when isUser is true', () => {
      render(
        <MatchupCard
          homeTeam={{ ...homeTeam, isUser: true }}
          awayTeam={awayTeam}
          week={14}
          status="final"
        />,
      );
      expect(screen.getByText('Your Team')).toBeInTheDocument();
    });

    it('does not show "Your Team" label when isUser is not set', () => {
      render(
        <MatchupCard homeTeam={homeTeam} awayTeam={awayTeam} week={14} status="final" />,
      );
      expect(screen.queryByText('Your Team')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders as an article with accessible name', () => {
      render(
        <MatchupCard homeTeam={homeTeam} awayTeam={awayTeam} week={14} status="final" />,
      );
      expect(
        screen.getByRole('article', {
          name: "Week 14 matchup: Team Alpha vs Jeff's Squad",
        }),
      ).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <MatchupCard
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          week={14}
          status="final"
          className="custom-class"
        />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
