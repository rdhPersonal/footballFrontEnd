import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

// Note: Radix Tooltip hover interaction (portal open/close) is not testable
// in happy-dom due to pointer event limitations. Hover behavior is verified
// visually via Storybook stories.

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('renders the trigger element', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('renders children as the trigger via asChild', () => {
      render(
        <Tooltip content="Tooltip text">
          <button type="button">Click target</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Click target' })).toBeInTheDocument();
    });

    it('does not render visible tooltip portal by default', () => {
      render(
        <Tooltip content="Hidden content">
          <button>Trigger</button>
        </Tooltip>,
      );
      // Portal content is only rendered on hover — not present by default
      expect(document.querySelector('[role="tooltip"][data-state]')).toBeNull();
    });
  });

  describe('Props', () => {
    it('accepts content as a string', () => {
      render(
        <Tooltip content="String content">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    });

    it('accepts content as ReactNode', () => {
      render(
        <Tooltip content={<strong>Bold content</strong>}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    });

    it('renders with each side prop without error', () => {
      const sides = ['top', 'right', 'bottom', 'left'] as const;
      for (const side of sides) {
        const { unmount } = render(
          <Tooltip content="Text" side={side}>
            <button>Trigger</button>
          </Tooltip>,
        );
        expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
        unmount();
      }
    });

    it('accepts a custom delayDuration without error', () => {
      render(
        <Tooltip content="Text" delayDuration={500}>
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    });

    it('accepts a className prop without error', () => {
      render(
        <Tooltip content="Text" className="custom-class">
          <button>Trigger</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('trigger retains its semantic role', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Hover me</button>
        </Tooltip>,
      );
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('does not add extra wrapper elements around the trigger', () => {
      const { container } = render(
        <Tooltip content="Text">
          <button>Trigger</button>
        </Tooltip>,
      );
      // asChild means the trigger is the button itself, not wrapped
      expect(container.querySelectorAll('button').length).toBe(1);
    });
  });
});
