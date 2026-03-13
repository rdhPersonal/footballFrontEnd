import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { X, Plus, Trash2 } from 'lucide-react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  // --- Rendering ---

  it('renders as a button element', () => {
    render(<IconButton icon={X} label="Close" />);
    expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
  });

  it('uses label as aria-label', () => {
    render(<IconButton icon={X} label="Close" />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<IconButton icon={Plus} label="Add player" />);
    const button = screen.getByRole('button', { name: 'Add player' });
    // Icon renders as an SVG inside the button
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('icon is aria-hidden', () => {
    render(<IconButton icon={X} label="Close" />);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toHaveAttribute('aria-hidden');
  });

  // --- Variants ---

  it('applies ghost variant by default', () => {
    render(<IconButton icon={X} label="Close" />);
    expect(screen.getByRole('button').className).toContain('bg-transparent');
  });

  it('applies primary variant styles', () => {
    render(<IconButton icon={Plus} label="Add" variant="primary" />);
    expect(screen.getByRole('button').className).toContain('bg-vegas-gold');
  });

  it('applies secondary variant styles', () => {
    render(<IconButton icon={X} label="Close" variant="secondary" />);
    expect(screen.getByRole('button').className).toContain('bg-brew-800');
  });

  it('applies danger variant styles', () => {
    render(<IconButton icon={Trash2} label="Delete" variant="danger" />);
    expect(screen.getByRole('button').className).toContain('bg-vegas-crimson');
  });

  // --- Sizes ---

  it('applies md size by default', () => {
    render(<IconButton icon={X} label="Close" />);
    expect(screen.getByRole('button').className).toContain('h-9');
    expect(screen.getByRole('button').className).toContain('w-9');
  });

  it('applies sm size styles', () => {
    render(<IconButton icon={X} label="Close" size="sm" />);
    expect(screen.getByRole('button').className).toContain('h-7');
  });

  it('applies lg size styles', () => {
    render(<IconButton icon={X} label="Close" size="lg" />);
    expect(screen.getByRole('button').className).toContain('h-11');
  });

  // --- Interaction ---

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={X} label="Close" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={X} label="Close" onClick={onClick} disabled />);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // --- States ---

  it('is disabled when disabled prop is true', () => {
    render(<IconButton icon={X} label="Close" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading spinner and is disabled when loading', () => {
    render(<IconButton icon={X} label="Close" loading />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('hides icon when loading', () => {
    render(<IconButton icon={X} label="Close" loading />);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).not.toBeInTheDocument();
  });

  // --- className override ---

  it('merges custom className', () => {
    render(<IconButton icon={X} label="Close" className="ml-2" />);
    expect(screen.getByRole('button').className).toContain('ml-2');
  });
});
