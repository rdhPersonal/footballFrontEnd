import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  // --- Horizontal (default) ---

  it('renders an hr element by default', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('has separator role', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('applies border styles', () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector('hr')!;
    expect(hr.className).toContain('border-brew-700');
  });

  // --- Horizontal with label ---

  it('renders label text when provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('does not render an hr when label is provided', () => {
    const { container } = render(<Divider label="OR" />);
    expect(container.querySelector('hr')).not.toBeInTheDocument();
  });

  it('has separator role when label is provided', () => {
    render(<Divider label="OR" />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('sets aria-label from the label prop', () => {
    render(<Divider label="OR" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'OR');
  });

  // --- Vertical ---

  it('renders a div for vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.querySelector('hr')).not.toBeInTheDocument();
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('has aria-orientation="vertical" for vertical', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies vertical width style', () => {
    render(<Divider orientation="vertical" />);
    const el = screen.getByRole('separator');
    expect(el.className).toContain('w-px');
  });

  // --- className override ---

  it('merges custom className on horizontal', () => {
    const { container } = render(<Divider className="my-4" />);
    const hr = container.querySelector('hr')!;
    expect(hr.className).toContain('my-4');
  });

  it('merges custom className on vertical', () => {
    render(<Divider orientation="vertical" className="mx-2" />);
    expect(screen.getByRole('separator').className).toContain('mx-2');
  });
});
