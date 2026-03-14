import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { WeekSelector } from './WeekSelector';

describe('WeekSelector', () => {
  describe('Rendering', () => {
    it('renders the current week', () => {
      render(<WeekSelector currentWeek={7} onWeekChange={vi.fn()} />);
      expect(screen.getByText('Week 7')).toBeInTheDocument();
    });

    it('renders previous and next buttons', () => {
      render(<WeekSelector currentWeek={7} onWeekChange={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Previous week' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next week' })).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('calls onWeekChange with week - 1 when previous is clicked', async () => {
      const user = userEvent.setup();
      const onWeekChange = vi.fn();
      render(<WeekSelector currentWeek={7} onWeekChange={onWeekChange} />);
      await user.click(screen.getByRole('button', { name: 'Previous week' }));
      expect(onWeekChange).toHaveBeenCalledWith(6);
    });

    it('calls onWeekChange with week + 1 when next is clicked', async () => {
      const user = userEvent.setup();
      const onWeekChange = vi.fn();
      render(<WeekSelector currentWeek={7} onWeekChange={onWeekChange} />);
      await user.click(screen.getByRole('button', { name: 'Next week' }));
      expect(onWeekChange).toHaveBeenCalledWith(8);
    });
  });

  describe('Boundary states', () => {
    it('disables previous button when on the first week', () => {
      render(<WeekSelector currentWeek={1} onWeekChange={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Previous week' })).toBeDisabled();
    });

    it('disables next button when on the last week', () => {
      render(
        <WeekSelector currentWeek={18} totalWeeks={18} onWeekChange={vi.fn()} />,
      );
      expect(screen.getByRole('button', { name: 'Next week' })).toBeDisabled();
    });

    it('enables both buttons when in the middle', () => {
      render(<WeekSelector currentWeek={9} onWeekChange={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Previous week' })).not.toBeDisabled();
      expect(screen.getByRole('button', { name: 'Next week' })).not.toBeDisabled();
    });

    it('respects custom minWeek', () => {
      render(
        <WeekSelector currentWeek={5} minWeek={5} onWeekChange={vi.fn()} />,
      );
      expect(screen.getByRole('button', { name: 'Previous week' })).toBeDisabled();
    });

    it('does not call onWeekChange when previous is disabled and clicked', async () => {
      const user = userEvent.setup();
      const onWeekChange = vi.fn();
      render(<WeekSelector currentWeek={1} onWeekChange={onWeekChange} />);
      await user.click(screen.getByRole('button', { name: 'Previous week' }));
      expect(onWeekChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has group role with accessible name', () => {
      render(<WeekSelector currentWeek={7} onWeekChange={vi.fn()} />);
      expect(screen.getByRole('group', { name: 'Week selector' })).toBeInTheDocument();
    });

    it('week display has aria-live="polite"', () => {
      render(<WeekSelector currentWeek={7} onWeekChange={vi.fn()} />);
      const liveRegion = screen.getByText('Week 7');
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <WeekSelector currentWeek={7} onWeekChange={vi.fn()} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
