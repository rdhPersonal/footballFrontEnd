import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  // --- Rendering ---

  it('renders a div element', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('is hidden from assistive technology', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden');
  });

  it('applies base shimmer styles', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('animate-pulse');
    expect(el.className).toContain('bg-brew-800');
    expect(el.className).toContain('rounded-md');
  });

  // --- className override ---

  it('merges custom className for sizing', () => {
    const { container } = render(<Skeleton className="h-4 w-32" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('h-4');
    expect(el.className).toContain('w-32');
  });

  it('merges custom className for circular shape', () => {
    const { container } = render(<Skeleton className="h-10 w-10 rounded-full" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('rounded-full');
  });
});
