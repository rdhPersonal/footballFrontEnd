import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  // --- Rendering ---

  it('renders children', () => {
    render(<Section>Section content</Section>);
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('renders as a section element', () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.firstChild).toBeInstanceOf(HTMLElement);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  // --- Title ---

  it('renders title when provided', () => {
    render(<Section title="My Section">Content</Section>);
    expect(screen.getByRole('heading', { name: 'My Section' })).toBeInTheDocument();
  });

  it('does not render heading when title is not provided', () => {
    render(<Section>Content</Section>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders title as h2', () => {
    render(<Section title="Stats">Content</Section>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('applies heading styles to title', () => {
    render(<Section title="Stats">Content</Section>);
    const heading = screen.getByRole('heading');
    expect(heading.className).toContain('text-brew-50');
    expect(heading.className).toContain('text-xl');
  });

  // --- Description ---

  it('renders description when provided', () => {
    render(<Section description="Some description">Content</Section>);
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<Section title="Title">Content</Section>);
    // Only the heading should be there, no description paragraph with brew-400
    const desc = screen.queryByText(/description/i);
    expect(desc).not.toBeInTheDocument();
  });

  it('renders both title and description when both provided', () => {
    render(
      <Section title="Players" description="All available players">
        Content
      </Section>,
    );
    expect(screen.getByRole('heading', { name: 'Players' })).toBeInTheDocument();
    expect(screen.getByText('All available players')).toBeInTheDocument();
  });

  it('does not render header wrapper when neither title nor description provided', () => {
    const { container } = render(<Section>Just content</Section>);
    // No h2, no p from the header block
    expect(container.querySelector('h2')).not.toBeInTheDocument();
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  // --- className override ---

  it('merges custom className', () => {
    const { container } = render(<Section className="px-4">Content</Section>);
    const section = container.querySelector('section')!;
    expect(section.className).toContain('px-4');
  });
});
