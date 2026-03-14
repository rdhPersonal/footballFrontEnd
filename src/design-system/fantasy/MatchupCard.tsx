import { cn } from '../lib/cn';
import type { FantasyTeam } from './types';

type MatchupStatus = 'upcoming' | 'live' | 'final';

interface MatchupCardProps {
  homeTeam: FantasyTeam;
  awayTeam: FantasyTeam;
  week: number;
  status: MatchupStatus;
  className?: string;
}

const statusStyles: Record<MatchupStatus, string> = {
  upcoming: 'text-brew-400',
  live: 'text-vegas-emerald',
  final: 'text-brew-600',
};

const statusLabel: Record<MatchupStatus, string> = {
  upcoming: 'Upcoming',
  live: 'Live',
  final: 'Final',
};

function TeamColumn({
  team,
  isWinner,
  status,
}: {
  team: FantasyTeam;
  isWinner: boolean;
  status: MatchupStatus;
}): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center gap-1 text-center',
        team.isUser && 'relative',
      )}
    >
      {team.isUser && (
        <span className="absolute -top-5 text-xs font-medium text-vegas-gold">
          Your Team
        </span>
      )}
      <span
        className={cn(
          'text-sm font-semibold leading-tight',
          isWinner && status === 'final' ? 'text-brew-50' : 'text-brew-200',
        )}
      >
        {team.name}
      </span>
      {team.record && (
        <span className="text-xs text-brew-600">{team.record}</span>
      )}
      {team.score !== undefined && (
        <span
          className={cn(
            'font-mono text-3xl font-bold tabular-nums',
            isWinner && status === 'final'
              ? 'text-vegas-gold'
              : 'text-brew-200',
          )}
        >
          {team.score.toFixed(2)}
        </span>
      )}
    </div>
  );
}

export function MatchupCard({
  homeTeam,
  awayTeam,
  week,
  status,
  className,
}: MatchupCardProps): React.ReactElement {
  const homeScore = homeTeam.score ?? 0;
  const awayScore = awayTeam.score ?? 0;
  const homeWins = status === 'final' && homeScore > awayScore;
  const awayWins = status === 'final' && awayScore > homeScore;

  return (
    <article
      aria-label={`Week ${week} matchup: ${homeTeam.name} vs ${awayTeam.name}`}
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-brew-700 bg-brew-900 p-4 shadow-brew',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-brew-600">
          Week {week}
        </span>
        <span
          className={cn('text-xs font-semibold uppercase', statusStyles[status])}
          aria-label={`Status: ${statusLabel[status]}`}
        >
          {statusLabel[status]}
        </span>
      </div>

      {/* Scores */}
      <div className="flex items-center gap-4 pt-2">
        <TeamColumn team={homeTeam} isWinner={homeWins} status={status} />
        <span className="shrink-0 text-sm font-medium text-brew-600">vs</span>
        <TeamColumn team={awayTeam} isWinner={awayWins} status={status} />
      </div>
    </article>
  );
}
