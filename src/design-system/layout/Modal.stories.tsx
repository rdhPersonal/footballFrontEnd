import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../primitives/Button';

const meta: Meta<typeof Modal> = {
  title: 'Layout/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

function DefaultStory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Modal Title">
        <p className="text-brew-200">
          Modal body content goes here. This is the default modal appearance.
        </p>
      </Modal>
    </>
  );
}

function WithDescriptionStory() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Drop Player</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Drop Player"
        description="Dropping this player will make them available on the waiver wire."
      >
        <p className="mb-4 text-brew-200">
          Are you sure you want to drop <strong className="text-brew-50">Christian McCaffrey</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger">Drop Player</Button>
        </div>
      </Modal>
    </>
  );
}

function TradeOfferStory() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>View Trade</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Trade Offer"
        description="Review the terms of this trade before accepting or declining."
      >
        <div className="space-y-4">
          <div className="rounded-md bg-brew-900 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-brew-400 mb-2">You Give</p>
            <p className="text-brew-50">Tyreek Hill (WR)</p>
          </div>
          <div className="rounded-md bg-brew-900 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-brew-400 mb-2">You Receive</p>
            <p className="text-brew-50">Justin Jefferson (WR)</p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Decline</Button>
            <Button variant="primary">Accept Trade</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export const Default: Story = { render: () => <DefaultStory /> };

export const WithDescription: Story = { render: () => <WithDescriptionStory /> };

export const TradeOffer: Story = { render: () => <TradeOfferStory /> };
