import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopNav } from './TopNav';

describe('TopNav', () => {
  // --- Rendering ---

  it('renders as a header element', () => {
    render(<TopNav />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  // --- League name ---

  it('renders league name when provided', () => {
    render(<TopNav leagueName="Dynasty League" />);
    expect(screen.getByText('Dynasty League')).toBeInTheDocument();
  });

  it('does not render league name when not provided', () => {
    render(<TopNav />);
    expect(screen.queryByText('Dynasty League')).not.toBeInTheDocument();
  });

  // --- User ---

  it('renders user name when user is provided', () => {
    render(<TopNav user={{ name: 'Alex Johnson' }} />);
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  });

  it('renders user email when provided', () => {
    render(<TopNav user={{ name: 'Alex Johnson', email: 'alex@example.com' }} />);
    expect(screen.getByText('alex@example.com')).toBeInTheDocument();
  });

  it('does not render email when not provided', () => {
    render(<TopNav user={{ name: 'Alex Johnson' }} />);
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });

  it('does not render user section when user is not provided', () => {
    render(<TopNav leagueName="My League" />);
    // No avatar or name
    expect(screen.queryByText(/^[A-Z]$/)).not.toBeInTheDocument();
  });

  it('renders avatar with first letter of user name', () => {
    render(<TopNav user={{ name: 'Alex Johnson' }} />);
    // Avatar uses aria-hidden so we query by text content
    const avatar = screen.getByText('A');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-hidden');
  });

  it('renders avatar initial as uppercase', () => {
    render(<TopNav user={{ name: 'zach wilson' }} />);
    expect(screen.getByText('Z')).toBeInTheDocument();
  });

  // --- Children slot ---

  it('renders children in the left slot', () => {
    render(<TopNav><span>Breadcrumb</span></TopNav>);
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
  });

  // --- className override ---

  it('merges custom className', () => {
    render(<TopNav className="border-red-500" />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('border-red-500');
  });

  // --- Styles ---

  it('applies surface background', () => {
    render(<TopNav />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-brew-900');
  });
});
