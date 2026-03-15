import { Card, Section } from '@/design-system';
import { PlayerSearchForm } from '@/features/players/PlayerSearchForm';

export default function PlayerSearchPage(): React.ReactElement {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <Section
        title="Search Players"
        description="Start with a few filters, then move into results and detailed scouting."
      >
        <PlayerSearchForm />
      </Section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="bg-[linear-gradient(135deg,_rgba(212,168,67,0.14),_rgba(18,17,26,1))]">
          <Card.Body>
            <p className="text-xs uppercase tracking-[0.26em] text-vegas-gold/80">
              Step 1
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brew-50">Pick your lens</h2>
            <p className="mt-2 text-sm text-brew-300">
              Search by player name, narrow by position, or isolate a specific team or season.
            </p>
          </Card.Body>
        </Card>
        <Card className="bg-[linear-gradient(135deg,_rgba(194,76,255,0.12),_rgba(18,17,26,1))]">
          <Card.Body>
            <p className="text-xs uppercase tracking-[0.26em] text-vegas-gold/80">
              Step 2
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brew-50">Scan the field</h2>
            <p className="mt-2 text-sm text-brew-300">
              Review matching players in a sortable list, then jump straight into individual detail.
            </p>
          </Card.Body>
        </Card>
        <Card className="bg-[linear-gradient(135deg,_rgba(45,212,160,0.12),_rgba(18,17,26,1))]">
          <Card.Body>
            <p className="text-xs uppercase tracking-[0.26em] text-vegas-gold/80">
              Step 3
            </p>
            <h2 className="mt-3 text-xl font-semibold text-brew-50">Scout the profile</h2>
            <p className="mt-2 text-sm text-brew-300">
              Open the player page for season filters, weekly scoring, category stats, and roster history.
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
