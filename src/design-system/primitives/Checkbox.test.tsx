import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders an unchecked checkbox', () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders a checked checkbox', () => {
      render(<Checkbox checked={true} onChange={() => {}} />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('renders a label when provided', () => {
      render(<Checkbox checked={false} onChange={() => {}} label="Remember me" />);
      expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    });

    it('renders without a label', () => {
      render(<Checkbox checked={false} onChange={() => {}} aria-label="Accept terms" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders indeterminate state', () => {
      render(<Checkbox checked={false} onChange={() => {}} indeterminate />);
      expect(screen.getByRole('checkbox')).toHaveProperty('indeterminate', true);
    });
  });

  describe('Sizes', () => {
    it('renders sm size', () => {
      render(<Checkbox checked={false} onChange={() => {}} size="sm" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders md size by default', () => {
      render(<Checkbox checked={false} onChange={() => {}} />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders lg size', () => {
      render(<Checkbox checked={false} onChange={() => {}} size="lg" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onChange with true when unchecked checkbox is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Checkbox checked={false} onChange={onChange} label="Accept" />);
      await user.click(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when checked checkbox is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Checkbox checked={true} onChange={onChange} label="Accept" />);
      await user.click(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it('calls onChange when label is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Checkbox checked={false} onChange={onChange} label="Accept terms" />);
      await user.click(screen.getByText('Accept terms'));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange when space key is pressed', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Checkbox checked={false} onChange={onChange} />);
      screen.getByRole('checkbox').focus();
      await user.keyboard(' ');
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('States', () => {
    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Checkbox checked={false} onChange={onChange} disabled label="Accept" />);
      await user.click(screen.getByRole('checkbox'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('has disabled attribute when disabled', () => {
      render(<Checkbox checked={false} onChange={() => {}} disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('is associated with its label via htmlFor', () => {
      render(<Checkbox checked={false} onChange={() => {}} label="Subscribe" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Subscribe');
      expect(label.closest('label')).toHaveAttribute('for', checkbox.id);
    });

    it('accepts an aria-label when no label prop is provided', () => {
      render(<Checkbox checked={false} onChange={() => {}} aria-label="Select row" />);
      expect(screen.getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
    });

    it('accepts a className for consumer overrides', () => {
      const { container } = render(
        <Checkbox checked={false} onChange={() => {}} className="custom-class" />,
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
