import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  // --- Rendering ---

  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders as an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLInputElement);
  });

  // --- Label ---

  it('renders label when provided', () => {
    render(<Input label="Search players" />);
    expect(screen.getByText('Search players')).toBeInTheDocument();
  });

  it('does not render label element when not provided', () => {
    render(<Input />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<Input label="Player name" />);
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Player name');
    expect(label).toHaveAttribute('for', input.id);
  });

  // --- Error ---

  it('renders error message when provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not render error when not provided', () => {
    render(<Input />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('sets aria-invalid on input when error is provided', () => {
    render(<Input error="Invalid value" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when no error', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('error message has alert role', () => {
    render(<Input error="Required" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies error border styles', () => {
    render(<Input error="Invalid" />);
    expect(screen.getByRole('textbox').className).toContain('border-vegas-crimson');
  });

  // --- Hint ---

  it('renders hint when provided', () => {
    render(<Input hint="Enter first and last name" />);
    expect(screen.getByText('Enter first and last name')).toBeInTheDocument();
  });

  it('does not render hint when error is also provided', () => {
    render(<Input error="Required" hint="Should not show" />);
    expect(screen.queryByText('Should not show')).not.toBeInTheDocument();
  });

  // --- Interaction ---

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'Mahomes');
    expect(onChange).toHaveBeenCalled();
  });

  it('accepts typed value', async () => {
    const user = userEvent.setup();
    render(<Input defaultValue="" />);
    await user.type(screen.getByRole('textbox'), 'Mahomes');
    expect(screen.getByRole('textbox')).toHaveValue('Mahomes');
  });

  // --- States ---

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies disabled styles', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox').className).toContain('disabled:opacity-50');
  });

  // --- className override ---

  it('merges custom className onto input', () => {
    render(<Input className="w-64" />);
    expect(screen.getByRole('textbox').className).toContain('w-64');
  });
});
