import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const positions = [
  { value: 'qb', label: 'Quarterback' },
  { value: 'rb', label: 'Running Back' },
  { value: 'wr', label: 'Wide Receiver' },
];

function openSelect() {
  const trigger = screen.getByRole('combobox');
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false });
  fireEvent.click(trigger);
}

describe('Select', () => {
  // --- Rendering ---

  it('renders a trigger button', () => {
    render(<Select options={positions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows placeholder when no value is selected', () => {
    render(<Select options={positions} placeholder="Select position" />);
    expect(screen.getByText('Select position')).toBeInTheDocument();
  });

  it('shows selected value', () => {
    render(<Select options={positions} value="qb" />);
    expect(screen.getByText('Quarterback')).toBeInTheDocument();
  });

  // --- Label ---

  it('renders label when provided', () => {
    render(<Select options={positions} label="Position" />);
    expect(screen.getByText('Position')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    render(<Select options={positions} />);
    expect(screen.queryByText('Position')).not.toBeInTheDocument();
  });

  // --- Error ---

  it('renders error message when provided', () => {
    render(<Select options={positions} error="Please select a position" />);
    expect(screen.getByText('Please select a position')).toBeInTheDocument();
  });

  it('error has alert role', () => {
    render(<Select options={positions} error="Required" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // --- Interaction ---

  it('opens dropdown when trigger is clicked', () => {
    render(<Select options={positions} />);
    openSelect();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders all options when open', () => {
    render(<Select options={positions} />);
    openSelect();
    expect(screen.getByRole('option', { name: 'Quarterback' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Running Back' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Wide Receiver' })).toBeInTheDocument();
  });

  it('calls onValueChange with selected value', () => {
    const onValueChange = vi.fn();
    render(<Select options={positions} onValueChange={onValueChange} />);
    openSelect();
    const option = screen.getByRole('option', { name: 'Running Back' });
    fireEvent.click(option);
    expect(onValueChange).toHaveBeenCalledWith('rb');
  });

  // --- States ---

  it('is disabled when disabled prop is true', () => {
    render(<Select options={positions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('does not open when disabled', () => {
    render(<Select options={positions} disabled />);
    openSelect();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
