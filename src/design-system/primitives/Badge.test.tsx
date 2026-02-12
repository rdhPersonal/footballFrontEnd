import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  // --- Rendering ---

  it('renders children as text content', () => {
    render(<Badge>QB</Badge>);
    expect(screen.getByText('QB')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Badge>RB</Badge>);
    const badge = screen.getByText('RB');
    expect(badge.tagName).toBe('SPAN');
  });

  // --- Variants ---

  it('applies default variant styles by default', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-brew-800');
    expect(badge.className).toContain('text-brew-200');
  });

  it('applies position variant styles', () => {
    render(<Badge variant="position">QB</Badge>);
    const badge = screen.getByText('QB');
    expect(badge.className).toContain('bg-vegas-gold');
    expect(badge.className).toContain('text-brew-950');
  });

  it('applies status variant with healthy value', () => {
    render(<Badge variant="status" status="healthy">Active</Badge>);
    const badge = screen.getByText('Active');
    expect(badge.className).toContain('bg-vegas-emerald/20');
    expect(badge.className).toContain('text-vegas-emerald');
  });

  it('applies status variant with out value', () => {
    render(<Badge variant="status" status="out">OUT</Badge>);
    const badge = screen.getByText('OUT');
    expect(badge.className).toContain('bg-vegas-crimson/20');
    expect(badge.className).toContain('text-vegas-crimson');
  });

  it('applies status variant with questionable value', () => {
    render(<Badge variant="status" status="questionable">Q</Badge>);
    const badge = screen.getByText('Q');
    expect(badge.className).toContain('bg-vegas-amber/20');
    expect(badge.className).toContain('text-vegas-amber');
  });

  it('applies status variant with doubtful value', () => {
    render(<Badge variant="status" status="doubtful">D</Badge>);
    const badge = screen.getByText('D');
    expect(badge.className).toContain('bg-vegas-crimson/20');
  });

  it('applies status variant with ir value', () => {
    render(<Badge variant="status" status="ir">IR</Badge>);
    const badge = screen.getByText('IR');
    expect(badge.className).toContain('bg-vegas-crimson/20');
  });

  it('applies score variant with elite tier', () => {
    render(<Badge variant="score" tier="elite">32.5</Badge>);
    const badge = screen.getByText('32.5');
    expect(badge.className).toContain('bg-vegas-emerald/20');
    expect(badge.className).toContain('text-vegas-emerald');
  });

  it('applies score variant with good tier', () => {
    render(<Badge variant="score" tier="good">22.1</Badge>);
    const badge = screen.getByText('22.1');
    expect(badge.className).toContain('bg-vegas-gold/20');
    expect(badge.className).toContain('text-vegas-gold');
  });

  it('applies score variant with average tier', () => {
    render(<Badge variant="score" tier="average">12.0</Badge>);
    const badge = screen.getByText('12.0');
    expect(badge.className).toContain('text-brew-400');
  });

  it('applies score variant with poor tier', () => {
    render(<Badge variant="score" tier="poor">4.2</Badge>);
    const badge = screen.getByText('4.2');
    expect(badge.className).toContain('bg-vegas-crimson/20');
    expect(badge.className).toContain('text-vegas-crimson');
  });

  // --- Sizes ---

  it('applies small size by default', () => {
    render(<Badge>SM</Badge>);
    const badge = screen.getByText('SM');
    expect(badge.className).toContain('text-xs');
    expect(badge.className).toContain('px-2');
  });

  it('applies medium size styles', () => {
    render(<Badge size="md">MD</Badge>);
    const badge = screen.getByText('MD');
    expect(badge.className).toContain('text-sm');
    expect(badge.className).toContain('px-2.5');
  });

  // --- className override ---

  it('merges custom className with default styles', () => {
    render(<Badge className="ml-2">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge.className).toContain('ml-2');
  });
});
