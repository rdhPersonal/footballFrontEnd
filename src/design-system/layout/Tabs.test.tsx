import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tabs } from './Tabs';

function renderTabs(defaultValue = 'tab1') {
  return render(
    <Tabs defaultValue={defaultValue}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Stats</Tabs.Trigger>
        <Tabs.Trigger value="tab2">History</Tabs.Trigger>
        <Tabs.Trigger value="tab3">News</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Stats content</Tabs.Content>
      <Tabs.Content value="tab2">History content</Tabs.Content>
      <Tabs.Content value="tab3">News content</Tabs.Content>
    </Tabs>,
  );
}

describe('Tabs', () => {
  // --- Rendering ---

  it('renders tab triggers', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'Stats' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'History' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'News' })).toBeInTheDocument();
  });

  it('renders the tab list with tablist role', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders the active tab panel', () => {
    renderTabs('tab1');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Stats content');
  });

  // --- Default value ---

  it('shows the panel matching defaultValue', () => {
    renderTabs('tab2');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('History content');
  });

  it('marks the default tab as selected', () => {
    renderTabs('tab1');
    expect(screen.getByRole('tab', { name: 'Stats' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('marks non-default tabs as not selected', () => {
    renderTabs('tab1');
    expect(screen.getByRole('tab', { name: 'History' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  // --- Interaction ---

  it('switches panel when a tab is clicked', async () => {
    const user = userEvent.setup();
    renderTabs('tab1');
    await user.click(screen.getByRole('tab', { name: 'History' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('History content');
  });

  it('marks clicked tab as selected', async () => {
    const user = userEvent.setup();
    renderTabs('tab1');
    await user.click(screen.getByRole('tab', { name: 'News' }));
    expect(screen.getByRole('tab', { name: 'News' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('deselects previously active tab on switch', async () => {
    const user = userEvent.setup();
    renderTabs('tab1');
    await user.click(screen.getByRole('tab', { name: 'History' }));
    expect(screen.getByRole('tab', { name: 'Stats' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  // --- Active styles ---

  it('applies active styles to the selected trigger', () => {
    renderTabs('tab1');
    const activeTab = screen.getByRole('tab', { name: 'Stats' });
    expect(activeTab.className).toContain('data-[state=active]:text-vegas-gold');
  });

  // --- className override ---

  it('merges custom className on Tabs.List', () => {
    render(
      <Tabs defaultValue="a">
        <Tabs.List className="gap-4">
          <Tabs.Trigger value="a">A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content A</Tabs.Content>
      </Tabs>,
    );
    expect(screen.getByRole('tablist').className).toContain('gap-4');
  });

  it('merges custom className on Tabs.Content', () => {
    render(
      <Tabs defaultValue="a">
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a" className="p-4">Content A</Tabs.Content>
      </Tabs>,
    );
    expect(screen.getByRole('tabpanel').className).toContain('p-4');
  });
});
