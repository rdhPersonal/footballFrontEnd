import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatSparkline } from './StatSparkline';

describe('StatSparkline', () => {
  describe('Rendering', () => {
    it('renders an SVG element', () => {
      const { container } = render(<StatSparkline data={[10, 20, 15, 30]} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders a polyline when data has 2+ points', () => {
      const { container } = render(<StatSparkline data={[10, 20, 30]} />);
      expect(container.querySelector('polyline')).toBeInTheDocument();
    });

    it('renders no polyline when data has fewer than 2 points', () => {
      const { container } = render(<StatSparkline data={[10]} />);
      expect(container.querySelector('polyline')).not.toBeInTheDocument();
    });

    it('renders no polyline for empty data', () => {
      const { container } = render(<StatSparkline data={[]} />);
      expect(container.querySelector('polyline')).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies width and height to the SVG', () => {
      const { container } = render(<StatSparkline data={[1, 2, 3]} width={120} height={48} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '120');
      expect(svg).toHaveAttribute('height', '48');
    });

    it('renders each color variant without error', () => {
      const colors = ['gold', 'emerald', 'crimson', 'default'] as const;
      for (const color of colors) {
        const { unmount, container } = render(
          <StatSparkline data={[10, 20, 15]} color={color} />,
        );
        expect(container.querySelector('svg')).toBeInTheDocument();
        unmount();
      }
    });

    it('applies custom className to the SVG', () => {
      const { container } = render(
        <StatSparkline data={[1, 2, 3]} className="custom-class" />,
      );
      expect(container.querySelector('svg')).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('SVG is aria-hidden (decorative)', () => {
      const { container } = render(<StatSparkline data={[10, 20, 30]} />);
      expect(container.querySelector('svg')).toHaveAttribute('aria-hidden');
    });
  });
});
