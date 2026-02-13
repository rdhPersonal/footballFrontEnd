# Fantasy Football

A fantasy football application built with Next.js, featuring a custom design system with a dark, luxurious aesthetic — witches brew meets Las Vegas class.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (custom brew/vegas theme) |
| Testing | Vitest + React Testing Library |
| Visual Testing | Storybook 8 |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/                    # Next.js pages, layouts, and BFF route handlers
├── design-system/          # Reusable UI component library
│   ├── primitives/         # Button, Badge, Avatar, Input, Toggle, etc.
│   ├── player/             # Player cards, stat rows, compare tray
│   ├── data-display/       # Stat tables, charts, score indicators
│   ├── layout/             # Card, Modal, Tabs, Sidebar, PageLayout
│   ├── fantasy/            # Lineup slots, roster grid, matchup cards
│   ├── tokens/             # Color palette and typography constants
│   └── index.ts            # Public API barrel export
├── features/               # App-specific hooks and logic
├── lib/                    # Shared utilities
└── types/                  # Shared TypeScript types
```

## Design System

The design system follows a **design-system-first** workflow: all UI components are built, tested, and storied in `src/design-system/` before being consumed by application pages.

### Theme: Witches Brew x Vegas Class

A dark, moody base with luxurious metallic and jewel-tone accents. High-roller lounge meets enchanted apothecary.

- **Brew** palette: Deep purple-blacks for surfaces, borders, and text
- **Vegas** accents: Gold CTAs, emerald success states, crimson danger, neon highlights
- **Typography**: Inter for UI text, JetBrains Mono for stats and numbers

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests (watch mode)
npm test

# Run tests once
npm run test:run

# Start Storybook
npm run storybook

# Production build
npm run build
```

## Architecture Principles

- **Design system first** — new UI starts in `src/design-system/`, gets tested and storied, then consumed by pages
- **Import boundaries** — app code imports from `@/design-system` barrel only; design system never imports app code
- **TDD** — Red-Green-Refactor for all behavioral code
- **Server Components by default** — pages fetch data server-side; interactive design system components use `'use client'`
- **Thin BFF** — `src/app/api/` proxies to AWS backend; no business logic in this repo
