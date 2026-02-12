/**
 * Brew/Vegas color palette.
 * These mirror the CSS custom properties defined in globals.css.
 * Use these for programmatic access (e.g., charts, dynamic styles).
 * For Tailwind classes, use the utility classes directly (bg-brew-900, text-vegas-gold, etc.).
 */

export const brew = {
  950: '#0a0a0f',
  900: '#12111a',
  800: '#1c1a27',
  700: '#2a2738',
  600: '#3d3952',
  400: '#8b85a1',
  200: '#d0cde0',
  50: '#f0eef5',
} as const;

export const vegas = {
  gold: '#d4a843',
  champagne: '#f5e6c8',
  neon: '#c24cff',
  emerald: '#2dd4a0',
  crimson: '#ef4444',
  amber: '#f59e0b',
} as const;
