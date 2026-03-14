import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  // --- Rendering ---

  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('applies base surface styles', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('bg-brew-900');
    expect(card.className).toContain('border-brew-700');
    expect(card.className).toContain('rounded-lg');
  });

  // --- className override ---

  it('merges custom className', () => {
    const { container } = render(<Card className="mt-4">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('mt-4');
  });

  // --- Card.Header ---

  it('renders Card.Header children', () => {
    render(
      <Card>
        <Card.Header>Header text</Card.Header>
      </Card>,
    );
    expect(screen.getByText('Header text')).toBeInTheDocument();
  });

  it('Card.Header has bottom border', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
      </Card>,
    );
    const header = screen.getByText('Header');
    expect(header.className).toContain('border-b');
    expect(header.className).toContain('border-brew-700');
  });

  it('Card.Header merges custom className', () => {
    render(
      <Card>
        <Card.Header className="gap-4">Header</Card.Header>
      </Card>,
    );
    const header = screen.getByText('Header');
    expect(header.className).toContain('gap-4');
  });

  // --- Card.Body ---

  it('renders Card.Body children', () => {
    render(
      <Card>
        <Card.Body>Body text</Card.Body>
      </Card>,
    );
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });

  it('Card.Body has padding', () => {
    render(
      <Card>
        <Card.Body>Body</Card.Body>
      </Card>,
    );
    const body = screen.getByText('Body');
    expect(body.className).toContain('px-5');
    expect(body.className).toContain('py-4');
  });

  it('Card.Body merges custom className', () => {
    render(
      <Card>
        <Card.Body className="space-y-2">Body</Card.Body>
      </Card>,
    );
    const body = screen.getByText('Body');
    expect(body.className).toContain('space-y-2');
  });

  // --- Card.Footer ---

  it('renders Card.Footer children', () => {
    render(
      <Card>
        <Card.Footer>Footer text</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('Card.Footer has top border', () => {
    render(
      <Card>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    const footer = screen.getByText('Footer');
    expect(footer.className).toContain('border-t');
    expect(footer.className).toContain('border-brew-700');
  });

  it('Card.Footer merges custom className', () => {
    render(
      <Card>
        <Card.Footer className="justify-end">Footer</Card.Footer>
      </Card>,
    );
    const footer = screen.getByText('Footer');
    expect(footer.className).toContain('justify-end');
  });

  // --- Composition ---

  it('renders all subcomponents together', () => {
    render(
      <Card>
        <Card.Header>The Header</Card.Header>
        <Card.Body>The Body</Card.Body>
        <Card.Footer>The Footer</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('The Header')).toBeInTheDocument();
    expect(screen.getByText('The Body')).toBeInTheDocument();
    expect(screen.getByText('The Footer')).toBeInTheDocument();
  });
});
