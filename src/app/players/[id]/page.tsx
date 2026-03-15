import { PlayerDetailView } from '@/features/players/PlayerDetailView';

interface PlayerDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getFirstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function PlayerDetailPage({
  params,
  searchParams,
}: PlayerDetailPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const seasonParam = getFirstValue(resolvedSearchParams.season);
  const weekParam = getFirstValue(resolvedSearchParams.week);
  const scoringParam = getFirstValue(resolvedSearchParams.scoring);
  const returnToParam = getFirstValue(resolvedSearchParams.returnTo);

  const season = seasonParam ? Number.parseInt(seasonParam, 10) : undefined;
  const week = weekParam ? Number.parseInt(weekParam, 10) : undefined;
  const returnTo = returnToParam && returnToParam.startsWith('/players/')
    ? returnToParam
    : '/players/results';

  return (
    <PlayerDetailView
      playerId={id}
      initialSeason={Number.isFinite(season) ? season : undefined}
      initialWeek={Number.isFinite(week) ? week : undefined}
      initialScoring={scoringParam || undefined}
      returnTo={returnTo}
    />
  );
}
