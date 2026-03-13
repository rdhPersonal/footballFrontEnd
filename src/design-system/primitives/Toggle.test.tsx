import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  // --- Rendering ---

  it('renders a switch', () => {
    render(<Toggle checked={false} onCheckedChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  // --- Checked state ---

  it('is checked when checked prop is true', () => {
    render(<Toggle checked={true} onCheckedChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('is unchecked when checked prop is false', () => {
    render(<Toggle checked={false} onCheckedChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('applies checked background styles', () => {
    render(<Toggle checked={true} onCheckedChange={vi.fn()} />);
    expect(screen.getByRole('switch').className).toContain('bg-vegas-gold');
  });

  it('applies unchecked background styles', () => {
    render(<Toggle checked={false} onCheckedChange={vi.fn()} />);
    expect(screen.getByRole('switch').className).toContain('bg-brew-700');
  });

  // --- Label ---

  it('renders label text when provided', () => {
    render(<Toggle checked={false} onCheckedChange={vi.fn()} label="Notifications" />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('uses label as aria-label on the switch', () => {
    render(
      <Toggle checked={false} onCheckedChange={vi.fn()} label="Email alerts" />,
    );
    expect(screen.getByRole('switch', { name: 'Email alerts' })).toBeInTheDocument();
  });

  it('does not render label text when not provided', () => {
    render(<Toggle checked={false} onCheckedChange={vi.fn()} />);
    // No visible text aside from switch internals
    expect(screen.queryByText(/notifications/i)).not.toBeInTheDocument();
  });

  // --- Interaction ---

  it('calls onCheckedChange when clicked', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Toggle checked={false} onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('calls onCheckedChange with false when toggling off', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Toggle checked={true} onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  // --- Disabled ---

  it('is disabled when disabled prop is true', () => {
    render(<Toggle checked={false} onCheckedChange={vi.fn()} disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not call onCheckedChange when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Toggle checked={false} onCheckedChange={onCheckedChange} disabled />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  // --- className override ---

  it('merges custom className on wrapper', () => {
    const { container } = render(
      <Toggle checked={false} onCheckedChange={vi.fn()} className="mt-4" />,
    );
    expect((container.firstChild as HTMLElement).className).toContain('mt-4');
  });
});
