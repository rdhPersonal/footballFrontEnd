import { Section } from '@/design-system';
import { PlayerResultsTable } from '@/features/players/PlayerResultsTable';
import { PlayerSearchForm } from '@/features/players/PlayerSearchForm';
import {
  buildPlayerSearchHref,
  parsePlayerSearchFilters,
} from '@/features/players/search-params';

interface PlayerResultsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PlayerResultsPage({
  searchParams,
}: PlayerResultsPageProps): Promise<React.ReactElement> {
  const filters = parsePlayerSearchFilters(await searchParams);
  const returnTo = buildPlayerSearchHref(filters);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <Section
        title="Player Results"
        description="Tighten the criteria or jump into a player card for deeper detail."
      >
        <PlayerSearchForm
          initialFilters={filters}
          submitLabel="Update Results"
        />
      </Section>

      <Section>
        <PlayerResultsTable filters={filters} returnTo={returnTo} />
      </Section>
    </div>
  );
}
