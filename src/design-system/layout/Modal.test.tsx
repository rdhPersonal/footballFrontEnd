import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

function renderModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  return render(
    <Modal
      open={true}
      onOpenChange={vi.fn()}
      title="Test Modal"
      {...props}
    >
      <p>Modal body</p>
    </Modal>,
  );
}

describe('Modal', () => {
  // --- Rendering ---

  it('renders dialog when open is true', () => {
    renderModal({ open: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render dialog when open is false', () => {
    renderModal({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the title', () => {
    renderModal({ title: 'Drop Player' });
    expect(screen.getByText('Drop Player')).toBeInTheDocument();
  });

  it('renders children', () => {
    renderModal();
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  // --- Description ---

  it('renders description when provided', () => {
    renderModal({ description: 'This action cannot be undone.' });
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
  });

  it('does not render description element when not provided', () => {
    renderModal({ description: undefined });
    // No paragraph with the brew-400 description style
    expect(screen.queryByText('This action cannot be undone.')).not.toBeInTheDocument();
  });

  // --- Close button ---

  it('renders a close button', () => {
    renderModal();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('calls onOpenChange with false when close button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderModal({ onOpenChange });
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // --- Accessibility ---

  it('dialog has an accessible name from the title', () => {
    renderModal({ title: 'Trade Offer' });
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Trade Offer');
  });

  it('close button has accessible label', () => {
    renderModal();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  // --- className override ---

  it('merges custom className onto dialog panel', () => {
    renderModal({ className: 'max-w-sm' });
    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('max-w-sm');
  });
});
