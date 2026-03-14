import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Search } from 'lucide-react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<EmptyState title="No players found" />);
      expect(screen.getByText('No players found')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(<EmptyState title="No players" description="Try adjusting your filters" />);
      expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      render(<EmptyState title="No players" />);
      expect(screen.queryByText('Try adjusting your filters')).not.toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(<EmptyState title="No results" icon={Search} />);
      // Icon is aria-hidden, so we check for the svg element
      const svg = document.querySelector('svg[aria-hidden]');
      expect(svg).toBeInTheDocument();
    });

    it('does not render icon container when icon is not provided', () => {
      render(<EmptyState title="No results" />);
      expect(document.querySelector('svg')).not.toBeInTheDocument();
    });

    it('renders action button when action is provided', () => {
      render(
        <EmptyState
          title="No players"
          action={{ label: 'Add Player', onClick: vi.fn() }}
        />,
      );
      expect(screen.getByRole('button', { name: 'Add Player' })).toBeInTheDocument();
    });

    it('does not render action button when action is not provided', () => {
      render(<EmptyState title="No players" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls action.onClick when action button is clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <EmptyState
          title="No players"
          action={{ label: 'Add Player', onClick }}
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Add Player' }));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <EmptyState title="No results" className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('renders title as a paragraph', () => {
      render(<EmptyState title="No players found" />);
      expect(screen.getByText('No players found').tagName).toBe('P');
    });
  });
});
