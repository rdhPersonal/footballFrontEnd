import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  // --- Rendering ---

  it('renders a circular container', () => {
    const { container } = render(<Avatar name="Patrick Mahomes" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('rounded-full');
  });

  it('has an accessible label from the name prop', () => {
    render(<Avatar name="Patrick Mahomes" />);
    expect(screen.getByLabelText('Patrick Mahomes')).toBeInTheDocument();
  });

  // --- Image ---

  it('renders an img when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" name="Patrick Mahomes" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('img has correct alt text', () => {
    render(<Avatar src="https://example.com/photo.jpg" name="Patrick Mahomes" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Patrick Mahomes');
  });

  it('does not render img when no src is provided', () => {
    render(<Avatar name="Patrick Mahomes" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  // --- Initials fallback ---

  it('shows initials when no src is provided', () => {
    render(<Avatar name="Patrick Mahomes" />);
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('shows initials when image fails to load', () => {
    render(<Avatar src="https://example.com/broken.jpg" name="Patrick Mahomes" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('shows single initial for single-word name', () => {
    render(<Avatar name="Mahomes" />);
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('uses first and last initial for multi-word name', () => {
    render(<Avatar name="Justin Jefferson" />);
    expect(screen.getByText('JJ')).toBeInTheDocument();
  });

  it('uppercases initials', () => {
    render(<Avatar name="tyreek hill" />);
    expect(screen.getByText('TH')).toBeInTheDocument();
  });

  it('initials are aria-hidden', () => {
    render(<Avatar name="Patrick Mahomes" />);
    expect(screen.getByText('PM')).toHaveAttribute('aria-hidden');
  });

  // --- Sizes ---

  it('applies md size by default', () => {
    render(<Avatar name="Test User" />);
    const el = screen.getByLabelText('Test User');
    expect(el.className).toContain('h-10');
    expect(el.className).toContain('w-10');
  });

  it('applies sm size', () => {
    render(<Avatar name="Test User" size="sm" />);
    expect(screen.getByLabelText('Test User').className).toContain('h-8');
  });

  it('applies lg size', () => {
    render(<Avatar name="Test User" size="lg" />);
    expect(screen.getByLabelText('Test User').className).toContain('h-12');
  });

  it('applies xl size', () => {
    render(<Avatar name="Test User" size="xl" />);
    expect(screen.getByLabelText('Test User').className).toContain('h-16');
  });

  // --- className override ---

  it('merges custom className', () => {
    render(<Avatar name="Test User" className="ring-2 ring-vegas-gold" />);
    expect(screen.getByLabelText('Test User').className).toContain('ring-2');
  });
});
