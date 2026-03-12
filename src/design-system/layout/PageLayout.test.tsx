import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  // --- Rendering ---

  it('renders children in main', () => {
    render(<PageLayout>Page content</PageLayout>);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders children inside main element', () => {
    render(<PageLayout>Content</PageLayout>);
    const main = screen.getByRole('main');
    expect(main).toHaveTextContent('Content');
  });

  // --- Sidebar ---

  it('renders sidebar when provided', () => {
    render(
      <PageLayout sidebar={<nav aria-label="Main navigation">Nav</nav>}>
        Content
      </PageLayout>,
    );
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('renders sidebar inside aside element', () => {
    render(
      <PageLayout sidebar={<span>Sidebar content</span>}>
        Content
      </PageLayout>,
    );
    const aside = screen.getByRole('complementary', { name: 'Sidebar' });
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveTextContent('Sidebar content');
  });

  it('does not render aside when sidebar is not provided', () => {
    render(<PageLayout>Content</PageLayout>);
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  // --- TopNav ---

  it('renders topNav when provided', () => {
    render(
      <PageLayout topNav={<header>Top nav</header>}>
        Content
      </PageLayout>,
    );
    expect(screen.getByText('Top nav')).toBeInTheDocument();
  });

  it('does not render topNav slot when not provided', () => {
    render(<PageLayout>Content</PageLayout>);
    // No banner role header from topNav
    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
  });

  // --- className override ---

  it('merges custom className onto main', () => {
    render(<PageLayout className="p-0">Content</PageLayout>);
    const main = screen.getByRole('main');
    expect(main.className).toContain('p-0');
  });

  // --- Composition ---

  it('renders sidebar, topNav, and children together', () => {
    render(
      <PageLayout
        sidebar={<nav aria-label="Main navigation">Sidebar</nav>}
        topNav={<header role="banner">TopNav</header>}
      >
        Main content
      </PageLayout>,
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('TopNav')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });
});
