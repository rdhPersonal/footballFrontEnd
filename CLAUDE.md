# CLAUDE.md — Football Frontend

This file documents the codebase as it exists today, plus conventions and guidance for all future work. Factual claims describe master unless stated otherwise. Planned/target architecture is clearly labeled in its own section.

---

## Project Overview

A **Next.js 16.1.6 (App Router)** fantasy football frontend with:
- AWS Cognito authentication (PKCE flow, tokens never reach the browser)
- Backend-for-Frontend (BFF) proxy to AWS API Gateway
- Design-system-first component architecture
- "Witches Brew x Vegas Class" dark theme (dark mode only)
- Deployed on **Vercel** (zero-config, preview deploys per branch)

**This is a single deployable frontend package** with no cross-repo dependencies. Backend API contract types are maintained locally in `src/types/api-contract.ts`, synced manually with the backend repo when contracts change. The design system is colocated as a directory (`src/design-system/`), not a separate package.

---

## Current Repo Snapshot

What exists **on master today:**

- **Auth/BFF foundation** is complete: 4 auth routes (`login`, `callback`, `logout`, `session`), 4 player proxy routes, middleware route guard, `useSession` hook, typed API client
- **API contract types** are maintained locally in `src/types/api-contract.ts`, synced manually with the backend repo (`footballBackEnd`)
- **Design system:** all 35 planned components are implemented across all 5 categories, each with tests and Storybook stories
- **Home page** (`src/app/page.tsx`) is a placeholder heading
- **No feature pages** exist yet — no `/roster`, `/players`, `/matchups`, `/waivers`, `/trades`
- **`test-setup.ts`** includes `@testing-library/jest-dom/vitest` plus Radix UI pointer capture polyfills

### Installed Dependencies

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.1.6 |
| Runtime | React | 19.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | v4 |
| Component primitives | Radix UI | (select, dialog, tabs, switch, tooltip) |
| Tables | TanStack Table | ^8 |
| Testing | Vitest + React Testing Library | ^4 / ^16 |
| Test DOM | happy-dom | ^20 |
| Visual Dev | Storybook (Vite) | ^8 |
| Auth/session | AWS Cognito + iron-session | ^8 |
| Utilities | clsx, tailwind-merge, lucide-react | |
| Fonts | Inter, JetBrains Mono | next/font/google |

### NOT Installed on Master

These are part of the target architecture but are not yet in `package.json`:
- **TanStack Query** — client-side data fetching/caching
- **eslint-plugin-boundaries** — import boundary enforcement

---

## Directory Structure

What actually exists on master:

```
src/
├── app/
│   ├── layout.tsx                # Root layout (fonts, global providers)
│   ├── page.tsx                  # Home — placeholder heading
│   ├── globals.css               # Tailwind + CSS custom properties (theme tokens)
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts    # PKCE flow initiation
│       │   ├── callback/route.ts # Cognito auth code exchange
│       │   ├── logout/route.ts   # Session destroy + Cognito logout
│       │   └── session/route.ts  # Session validation & user info
│       └── players/
│           ├── route.ts          # Player list (proxied to AWS)
│           └── [id]/
│               ├── route.ts             # Single player
│               ├── stats/route.ts       # Player statistics
│               └── roster-history/route.ts  # Roster transitions
├── design-system/
│   ├── primitives/               # Button, Badge, Avatar, IconButton, Input, Select, Toggle, Tooltip, Divider, Skeleton
│   ├── player/                   # PlayerStatRow, PlayerMiniCard, PlayerCardCompact, PlayerCardDetailed, PlayerCompareTray
│   ├── data-display/             # EmptyState, StatBar, StatSparkline, ScoreIndicator, RankBadge, MatchupDifficulty, StatTable
│   ├── layout/                   # Card, Modal, Tabs, Sidebar, TopNav, PageLayout, Section
│   ├── fantasy/                  # LineupSlot, RosterGrid, MatchupCard, WaiverCard, WeekSelector
│   ├── tokens/                   # Color and typography constants
│   ├── lib/cn.ts                 # clsx + tailwind-merge utility
│   └── index.ts                  # Barrel export — the ONLY import point for consumers
├── features/
│   └── auth/useSession.ts        # Client session hook
├── lib/
│   ├── session.ts                # iron-session wrapper + JWT decode
│   ├── api-client.ts             # Typed BFF API client using local API contract types
│   ├── bff-proxy.ts              # AWS proxy with auto token refresh
│   └── constants.ts              # Fantasy football rules (season length, roster slots)
├── types/
│   ├── api-contract.ts           # Backend API contract DTOs (synced from footballBackEnd)
│   ├── league.ts                 # Frontend-only league view types
│   └── index.ts
├── middleware.ts                  # Auth guard + public path allowlist
└── test-setup.ts                 # Vitest + jest-dom + Radix pointer polyfills
.storybook/
├── main.ts                       # Storybook config (Vite builder)
└── preview.ts                    # Theme backgrounds (brew-950 dark background)
```

---

## Development Commands

```bash
npm run dev           # Next.js dev server (http://localhost:3000)
npm run build         # Production build
npm run start         # Run production server
npm run lint          # ESLint check

npm run test          # Vitest in watch mode
npm run test:run      # Single test run (CI)
npm run test:ui       # Vitest UI dashboard
npm run storybook     # Storybook dev server (http://localhost:6006)
npm run build-storybook  # Build static Storybook docs
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and populate. These are **server-only** (no `NEXT_PUBLIC_` prefix) and must never be committed:

```
AWS_API_BASE_URL=         # AWS API Gateway base URL
COGNITO_DOMAIN=           # Cognito hosted UI domain
COGNITO_CLIENT_ID=        # Cognito app client ID
COGNITO_REDIRECT_URI=     # Must match Cognito app client settings
COGNITO_LOGOUT_URI=       # Post-logout redirect
SESSION_SECRET=           # 32-byte hex string: openssl rand -hex 32
```

Production values are configured in Vercel's environment settings per deployment environment.

---

## Architecture & Conventions

These sections are **prescriptive guidance** for all work going forward. Follow these patterns whenever building new features or components.

### 1. Design System First (CRITICAL)

All UI work starts in the design system:

1. **New UI element?** Build in `src/design-system/` first. Write tests (TDD). Add a Storybook story. Export from the barrel file. Only THEN consume it from `src/app/`.
2. **Modifying an existing element?** Change in `src/design-system/` first. Update tests. Verify in Storybook.
3. **Never build a one-off UI component directly in `src/app/`.** Truly page-specific layout glue can live in the page file, but its building blocks must come from the design system.

### 2. Import Boundary Rules (CRITICAL)

```
app/ → design-system/   ✓
design-system/ → app/   ✗ (never)
```

App code imports **only** from `@/design-system` (the barrel file, not internal paths):

```typescript
// ✅ CORRECT
import { Button, Badge } from '@/design-system';

// ❌ WRONG — reaching into internals
import { Button } from '@/design-system/primitives/Button';
```

The design system **never** imports: app state/contexts, Next.js routing (`next/navigation`), API clients, or feature business logic. Design system components receive data via props only — pure, presentational, app-agnostic.

`features/` contains app logic but not UI. Features export hooks/utilities. Pages in `app/` compose features with design-system components.

### 3. Server Components by Default

Use `'use client'` only when necessary. Place it as high as needed but as low as possible.

| Type | Directive | Examples |
|---|---|---|
| Server Components | (none) | `page.tsx`, `layout.tsx`, pure display wrappers |
| Client Components | `'use client'` | Interactive design-system components, `features/` hooks |

**The boundary pattern:**
```tsx
// Server Component (fetches data)
import { SomeTable } from '@/design-system';

export default async function SomePage() {
  const data = await fetchData(); // Server-side, no client-side spinner
  return <SomeTable data={data} />;
}

// Client Component (interactive)
'use client';
export function SomeTable({ data }: SomeTableProps) {
  const [sortBy, setSortBy] = useState('points');
  // ...
}
```

Pure display-only components (e.g., a `Badge` that just renders text) can remain Server Components — do NOT add `'use client'` unless the component actually uses client-side APIs.

### 4. Thin BFF Pattern

API route handlers in `src/app/api/` are thin proxies — no business logic:
- Validate the session
- Attach the ID token (`Authorization: Bearer <idToken>`)
- Proxy the request to AWS API Gateway
- Return the response

> **Critical:** The AWS API Gateway JWT authorizer validates **ID tokens** (not access tokens). Cognito access tokens set the audience to the User Pool URL, but the authorizer checks against the **client ID**, which only matches ID tokens. Always send the ID token as Bearer.

### 4a. API Contract Types

- Backend API contract types live in `src/types/api-contract.ts`.
- Import these types via `@/types/api-contract` (or from the `@/types` barrel).
- The backend repo (`footballBackEnd/packages/api-contract/src/index.ts`) is the source of truth for contract shape.
- When the backend changes an endpoint, update `src/types/api-contract.ts` to match and bump the `Last synced` date comment.
- This approach avoids cross-repo build dependencies, which is required for clean Vercel deployments.

### 5. Test-Driven for Behavioral Code

Write tests **before** implementation for design system components, utility functions, and auth flows. See [TDD Workflow](#tdd-workflow) below.

---

## Design System Conventions

### Adding a New Component

1. Create `src/design-system/<category>/MyComponent.tsx`
2. Create `src/design-system/<category>/MyComponent.test.tsx`
3. Create `src/design-system/<category>/MyComponent.stories.tsx`
4. Export from `src/design-system/<category>/index.ts`
5. Re-export from `src/design-system/index.ts`

### Component Structure Pattern

```tsx
'use client';

import { cn } from '../lib/cn';

type MyComponentVariant = 'primary' | 'secondary';
type MyComponentSize = 'sm' | 'md' | 'lg';

interface MyComponentProps {
  variant?: MyComponentVariant;
  size?: MyComponentSize;
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({
  variant = 'primary',
  size = 'md',
  className,
  children,
}: MyComponentProps): React.ReactElement {
  return (
    <div
      className={cn(
        'base-classes',
        {
          'primary-classes': variant === 'primary',
          'secondary-classes': variant === 'secondary',
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
```

### Component API Rules

- Every component must accept a `className` prop for consumer-side overrides via `tailwind-merge`.
- Use variant props (named strings), not raw class strings passed from outside.
- Keep prop interfaces minimal — prefer composition over configuration.
- Components are **stateless/controlled** by default. Internal state is acceptable only for UI concerns (open/closed, hover, focus). Data and selection state are always controlled via props.
- When building complex widgets (modals, dropdowns, tooltips), use Radix UI primitives for accessibility.
- All interactive components must be keyboard navigable. Use semantic HTML (`button`, `nav`, `table`, `th`, `td`) — not divs with click handlers.
- Color alone must never convey meaning — pair with icons or text (e.g., injury status).

### Composition Over Props

Prefer children/slots over deeply nested prop objects:

```tsx
// ✅ Composable
<Card>
  <Card.Header>
    <PlayerAvatar src={player.photo} />
    <Badge variant="position">{player.position}</Badge>
  </Card.Header>
  <Card.Body>{/* stats */}</Card.Body>
</Card>

// ❌ Monolithic prop bag
<Card header={...} body={...} avatar={...} badge={...} />
```

### Styling Conventions

- Tailwind utility-first — no CSS modules, no CSS-in-JS, no inline `style` attributes (unless dynamically computed from data).
- Use `cn()` from `src/design-system/lib/cn.ts` for conditional classes.
- Always use project tokens (`bg-brew-900`, `text-vegas-gold`) — never raw hex values or default Tailwind colors.
- **Class ordering:** `layout → sizing → spacing → typography → colors → borders → effects → states → transitions`
- **Mobile-first responsive:** base styles for mobile, `sm:`, `md:`, `lg:` for larger screens.
- Tables scroll horizontally on mobile (`overflow-x-auto`).

```tsx
// ✅ Organized classes
<div className="flex items-center gap-4 w-full p-4 text-sm text-brew-200 bg-brew-900 border border-brew-700 rounded-lg shadow-brew hover:border-vegas-gold/30 transition-colors duration-200" />
```

---

## Theme: Witches Brew x Vegas Class

A dark, moody base (the brew) with luxurious metallic and jewel-tone accents (the Vegas). **Dark mode only — no light mode.** Theme tokens are defined in `src/app/globals.css` and `src/design-system/tokens/`.

### Brew Palette (Backgrounds, Surfaces, Text)

| Token | Hex | Role |
|---|---|---|
| `brew-950` | `#0a0a0f` | Deepest background (page bg) |
| `brew-900` | `#12111a` | Card/surface background |
| `brew-800` | `#1c1a27` | Elevated surface (modals, dropdowns) |
| `brew-700` | `#2a2738` | Borders, subtle dividers |
| `brew-600` | `#3d3952` | Muted text, disabled states |
| `brew-400` | `#8b85a1` | Secondary text |
| `brew-200` | `#d0cde0` | Primary body text |
| `brew-50` | `#f0eef5` | Headings, high-emphasis text |

### Vegas Accents (CTAs, Status, Highlights)

| Token | Hex | Role |
|---|---|---|
| `vegas-gold` | `#d4a843` | Primary accent — CTAs, highlights, active states |
| `vegas-champagne` | `#f5e6c8` | Hover states, subtle gold |
| `vegas-neon` | `#c24cff` | Secondary accent — alerts, special badges |
| `vegas-emerald` | `#2dd4a0` | Success, positive stats, upward trends |
| `vegas-crimson` | `#ef4444` | Danger, negative stats, injuries |
| `vegas-amber` | `#f59e0b` | Warnings, questionable status |

### Typography

| Font | Use | Loaded via |
|---|---|---|
| **Inter** | Headings and body text | `next/font/google` |
| **JetBrains Mono** | Stat numbers, table data, monospace | `next/font/google` |

**Scale (Tailwind defaults):**

| Class | Size | Use |
|---|---|---|
| `text-xs` | 0.75rem | Stat labels, footnotes |
| `text-sm` | 0.875rem | Table data, secondary info |
| `text-base` | 1rem | Body text |
| `text-lg` | 1.125rem | Card titles |
| `text-xl` | 1.25rem | Section headers |
| `text-2xl` | 1.5rem | Page titles |
| `text-4xl` | 2.25rem | Hero numbers, featured stats |

### Shadows & Glows

| Token | Value | Use |
|---|---|---|
| `shadow-brew` | `0 4px 24px rgba(10, 10, 15, 0.6)` | Ambient card shadow |
| `shadow-gold` | `0 0 20px rgba(212, 168, 67, 0.15)` | Gold glow for featured items |
| `shadow-neon` | `0 0 16px rgba(194, 76, 255, 0.2)` | Accent glow for special elements |

### Border Radius

| Element | Class |
|---|---|
| Cards, containers | `rounded-lg` (8px) |
| Buttons, inputs | `rounded-md` (6px) |
| Avatars, badges | `rounded-full` |

### Interaction Patterns

- **Hover:** `ring-1 ring-vegas-gold/30`
- **Focus:** `focus-visible:ring-2 focus-visible:ring-vegas-gold`
- **Loading:** Skeleton shimmer pulsing `brew-800` to `brew-700`
- **Transitions:** `transition-all duration-200 ease-in-out` default; `duration-300` for color fades

---

## TDD Workflow

**Write the test first.** Red-Green-Refactor:

1. **Red:** Write a failing test describing the desired behavior.
2. **Green:** Write the minimum code to make it pass.
3. **Refactor:** Clean up while keeping tests green.
4. Repeat for the next behavior.

### TDD Checklist for Every New Component

Before a component is considered complete:

- [ ] Renders with required props (happy path)
- [ ] Each visual variant renders distinctly
- [ ] Conditional elements show/hide based on props
- [ ] Callbacks fire on user interaction
- [ ] Disabled/loading states prevent interaction
- [ ] Accessibility: correct roles, labels, keyboard navigation

### When to TDD (always)

- New design system components
- Custom hooks (via `renderHook`)
- Utility functions in `src/lib/`

### When to test after (exception, not the rule)

- Exploratory prototyping — stabilize the API first, backfill before merging
- Visual/layout-only work — use Storybook stories instead

---

## Testing Conventions

### Test File Structure

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  describe('Rendering', () => {
    it('renders with default props', () => { ... });
  });

  describe('Variants', () => {
    it('applies primary variant classes', () => { ... });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<MyComponent onClick={onClick} />);
      await user.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => { ... });
  });
});
```

### Key Rules

- **Prefer semantic queries:** `getByRole` > `getByText` > `getByTestId`
- **Use `userEvent`** over `fireEvent` for standard interaction simulation; see [Testing Gotchas](#testing-gotchas) for exceptions
- **Mock functions** with `vi.fn()`
- **`it` block names** start with a verb: "renders", "calls", "shows", "hides". Be specific: "shows injury badge when player status is OUT", not "renders correctly".
- Colocate tests with source: `Button.tsx` → `Button.test.tsx` in the same directory
- Use `.test.tsx` suffix (not `.spec`)
- Organize tests by behavior category (Rendering, Variants, Sizes, Interaction, States, Accessibility)

### What NOT to Test

- Internal state
- CSS class names (prefer behavior assertions)
- Implementation details
- Third-party library behavior

### Testing Gotchas

**Radix UI components in happy-dom:**

Radix UI uses `hasPointerCapture` / `setPointerCapture` / `releasePointerCapture` internally. happy-dom doesn't implement these. Polyfills are already in `src/test-setup.ts`:

```ts
if (typeof window !== 'undefined') {
  if (!window.HTMLElement.prototype.hasPointerCapture) {
    window.HTMLElement.prototype.hasPointerCapture = () => false;
  }
  if (!window.HTMLElement.prototype.setPointerCapture) {
    window.HTMLElement.prototype.setPointerCapture = () => {};
  }
  if (!window.HTMLElement.prototype.releasePointerCapture) {
    window.HTMLElement.prototype.releasePointerCapture = () => {};
  }
}
```

**Radix Select — opening the dropdown:**

`userEvent.click` does not open Radix Select in happy-dom. Use `fireEvent`:

```ts
function openSelect() {
  const trigger = screen.getByRole('combobox');
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false });
  fireEvent.click(trigger);
}
// Then select an option:
fireEvent.click(screen.getByRole('option', { name: 'Option Label' }));
```

**Radix Tooltip — hover interaction:**

`userEvent.hover` does not trigger the Radix Tooltip portal to open in happy-dom. Do not write hover-triggered tests. Cover the tooltip content in Storybook stories instead. Structural tests (tooltip exists in DOM, correct `asChild` target) are acceptable.

**TanStack Table — sort direction:**

TanStack Table defaults `sortDescFirst: true` for numeric columns. The **first** click on a sortable header sorts **descending** (highest value first). The second click sorts ascending. Test assertions must match this:

```ts
fireEvent.click(screen.getByRole('columnheader', { name: /points/i }));
// rows[0] should have the HIGHEST value, not the lowest
```

**TanStack Table — click handler:**

Use `fireEvent.click` (not `userEvent.click`) on `<th>` sort headers — `userEvent` doesn't reliably trigger the sort handler in happy-dom.

---

## TypeScript Conventions

- **Strict mode** enabled — no implicit `any`, no unchecked index access
- **`interface` for component props;** `type` for unions, intersections, and utility types
- **No `any`** — use `unknown` and narrow with type guards
- **Explicit return types** on exported functions
- **Type imports:** `import type { Foo } from './foo'`
- **No `I`-prefix** for interfaces (`ButtonProps`, not `IButtonProps`)
- **`as const`** for literal objects and enums-as-objects

```typescript
// ✅ Props use interface
interface PlayerCardProps {
  name: string;
  position: Position;
  stats: PlayerStats;
  onSelect?: (playerId: string) => void;
}

// ✅ Unions use type
type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';
```

### Naming Conventions

| Thing | Convention |
|---|---|
| Constants | `UPPER_SNAKE_CASE` |
| Types / Interfaces / Components | `PascalCase` |
| Functions / variables / hooks | `camelCase` |
| Files (components) | `PascalCase.tsx` |
| Files (utilities) | `camelCase.ts` |
| Directories | `kebab-case` |

### Export Rules

- **Named exports only** — no default exports.
- **Exceptions:** Next.js `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` require default exports. Storybook `*.stories.tsx` `meta` also requires a default export.

---

## Storybook

Stories live alongside components: `Button.stories.tsx` next to `Button.tsx`. Stories are for **design system components only** — not app pages or feature modules.

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Primitives/MyComponent',   // Category prefix required
  component: MyComponent,
  parameters: {
    backgrounds: { default: 'brew' },  // Always use dark brew background
  },
  tags: ['autodocs'],
};
export default meta;  // NOTE: default export is the ONE exception to named-exports-only

type Story = StoryObj<typeof MyComponent>;

export const Default: Story = { args: { variant: 'primary' } };
```

### Story Categories (sidebar organization)

| Category | Components |
|---|---|
| `Primitives/` | Button, Badge, Avatar, IconButton, Input, Select, Toggle, Tooltip, Divider, Skeleton |
| `Player/` | PlayerStatRow, PlayerMiniCard, PlayerCardCompact, PlayerCardDetailed, PlayerCompareTray |
| `Data Display/` | EmptyState, StatBar, StatSparkline, ScoreIndicator, RankBadge, MatchupDifficulty, StatTable |
| `Layout/` | Card, Modal, Tabs, Sidebar, TopNav, PageLayout, Section |
| `Fantasy/` | LineupSlot, RosterGrid, MatchupCard, WaiverCard, WeekSelector |

### What Every Story Must Include

1. **Default** — component with required props only
2. **All variants** — one story per visual variant
3. **Edge cases** — long text, missing optional data, empty states
4. **Interactive** — demonstrates hover, focus, click via Storybook actions

---

## Authentication Flow

The app uses **Cognito PKCE Authorization Code Flow**. Tokens never reach the browser.

1. `GET /api/auth/login` — Generate PKCE verifier + S256 challenge, redirect to Cognito Hosted UI
2. Cognito redirects to `GET /api/auth/callback?code=...`
3. Callback exchanges auth code for tokens **server-side**, stores them in the iron-session encrypted HTTP-only cookie (30-day, SameSite=Lax)
4. `GET /api/auth/session` — Returns current user info decoded from ID token
5. `GET /api/auth/logout` — Destroys cookie, redirects to Cognito logout

`src/middleware.ts` guards page routes and API routes, but treats all `/api/auth/*` routes plus `/_next/*` and `/favicon.ico` as public. Page routes redirect to login; protected API routes return 401.

### Security Properties

- Tokens never exist in client-side JavaScript — no XSS risk for token theft
- Browser only has an encrypted HTTP-only cookie — JS cannot read it
- Refresh tokens are server-side only, never exposed to the browser
- PKCE prevents authorization code interception attacks
- SameSite=Lax on the session cookie helps limit CSRF while still allowing the auth redirect flow to complete

### Token Types

| Token | Audience | Used For |
|---|---|---|
| ID token (JWT) | Cognito Client ID | Sent to AWS APIs as Bearer — API Gateway validates audience against client ID |
| Access token (JWT) | User Pool URL | NOT sent to AWS APIs (audience mismatch with authorizer) |
| Refresh token (opaque) | Server-side only | Token renewal via BFF, never exposed to browser |

---

## BFF API Proxy Pattern

All data fetching goes through `src/app/api/` route handlers:

```
Client → /api/players → src/app/api/players/route.ts → AWS API Gateway
```

Use `proxyToAws()` from `src/lib/bff-proxy.ts` in every route handler. It handles:
- Session retrieval
- Token refresh if expired
- Attaching `Authorization: Bearer <idToken>` header
- Forwarding the response

The client-side API functions live in `src/lib/api-client.ts`. They call `/api/*` BFF endpoints and handle 401 redirects automatically.

**Data route handler pattern:**

```typescript
export async function GET(request: NextRequest): Promise<NextResponse> {
  // 1. Validate session
  const session = await getSession();
  if (!session.idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Refresh ID token if expired
  if (isTokenExpired(session.expiresAt)) {
    const newTokens = await refreshTokens(session.refreshToken);
    if (!newTokens) {
      session.destroy();
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    session.idToken = newTokens.id_token;
    session.accessToken = newTokens.access_token;
    if (newTokens.refresh_token) {
      session.refreshToken = newTokens.refresh_token;
    }

    const payload = decodeTokenPayload(newTokens.id_token);
    session.expiresAt =
      (payload?.exp as number) ??
      Math.floor(Date.now() / 1000) + newTokens.expires_in;

    await session.save();
  }

  // 3. Forward to AWS API with ID token as Bearer
  const response = await fetch(`${process.env.AWS_API_BASE_URL}/players`, {
    headers: {
      'Authorization': `Bearer ${session.idToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const status = response.status === 403 ? 403 : response.status >= 500 ? 502 : response.status;
    return NextResponse.json({ error: 'Request failed' }, { status });
  }

  return NextResponse.json(await response.json());
}
```

---

## Path Aliases

The `@` alias maps to `src/`:

```ts
import { Button } from '@/design-system';
import { useSession } from '@/features/auth/useSession';
import { getPlayers } from '@/lib/api-client';
```

---

## Planned / Target Architecture

Everything below is **future work**, not yet on master. It is separated here so AI assistants don't assume these things exist.

### Planned Dependencies (install when needed)

| Package | Purpose |
|---|---|
| TanStack Query | Client-side data caching, mutations, optimistic updates |
| eslint-plugin-boundaries | Enforce design-system/app import boundary at lint time |

### Planned Pages

| Route | Purpose |
|---|---|
| `/players` | Player search, stats, rankings |
| `/players/[id]` | Player detail view |
| `/roster` | Lineup management |
| `/matchups` | Weekly matchup views |
| `/waivers` | Waiver wire |
| `/trades` | Trade proposals |
| `/` (dashboard) | Replace placeholder with real dashboard |

### Planned Features

| Directory | Purpose |
|---|---|
| `features/roster/` | Roster management hooks |
| `features/players/` | Player search, filter, sort hooks |
| `features/matchups/` | Matchup comparison logic |

### Backend Improvements (AWS side)

- Normalize `stat_details` ESPN stat names to consistent schema
- Add fantasy scoring (`total_points`) during sync
- Populate bye week data

### Infrastructure Hardening

- Remove `ALLOW_USER_PASSWORD_AUTH` from Cognito
- Add Vercel production URL to Cognito callback/logout URLs
- CloudWatch alarms, SSM Session Manager, Secrets Manager
- Full E2E browser test: sign in → fetch player data → render
- Token refresh verification (wait for ID token to expire)

---

## Decision Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-03-01 | Send ID token (not access token) to AWS API | API Gateway JWT authorizer validates audience against client ID, which only matches ID tokens |
| 2026-03-01 | Use iron-session for encrypted cookies | Keeps tokens server-side only, no XSS exposure |
| 2026-03-01 | Upgrade Lambda to Node.js 22.x | AWS ending Node 20 support April 30, 2026 |
| 2026-03-01 | Phase 1 focuses on auth + BFF first | Frontend can't do anything useful without backend connectivity |
| 2026-03-13 | Complex design-system components may need local type definitions | Keep the design system independent from app-layer imports, even when that means duplicating narrowly scoped types |

---

## What Not To Do

- **Don't import app code from the design system** — the dependency is one-way
- **Don't reach into design system internals** — always import from `@/design-system`
- **Don't put business logic in BFF route handlers** — keep them as thin proxies
- **Don't send access tokens to AWS APIs** — always use ID tokens (audience mismatch)
- **Don't expose tokens to the browser** — session cookie is the only auth artifact the browser sees
- **Don't use `getByTestId`** in tests unless there's no semantic alternative
- **Don't use `fireEvent` for standard interactions** — use `userEvent`; if a third-party widget needs lower-level events in tests, document the reason near the test
- **Don't test CSS class names or implementation details** — test behavior
- **Don't use CSS modules, CSS-in-JS, or inline `style` attributes** — Tailwind utilities only
- **Don't use raw hex values or default Tailwind colors** — use project tokens (`brew-*`, `vegas-*`)
- **Don't skip the `.stories.tsx` file** when adding a new design system component
- **Don't use `any`** — use `unknown` with type guards
- **Don't use default exports** — except Next.js pages/layouts and Storybook `meta`
- **Don't commit `.env.local`** — never commit real secret values
- **Don't assume planned pages/features exist** — check the repo before building on top of unimplemented features
