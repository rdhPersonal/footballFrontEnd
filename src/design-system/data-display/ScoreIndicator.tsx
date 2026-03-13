import { cn } from '../lib/cn';

type ScoreResult = 'win' | 'loss' | 'tie';

interface ScoreIndicatorProps {
  homeScore: number;
  awayScore: number;
  homeTeam?: string;
  awayTeam?: string;
  result?: ScoreResult;
  className?: string;
}

const resultStyles: Record<ScoreResult, { home: string; away: string }> = {
  win: {
    home: 'text-vegas-emerald',
    away: 'text-brew-400',
  },
  loss: {
    home: 'text-vegas-crimson',
    away: 'text-brew-400',
  },
  tie: {
    home: 'text-vegas-amber',
    away: 'text-vegas-amber',
  },
};

export function ScoreIndicator({
  homeScore,
  awayScore,
  homeTeam,
  awayTeam,
  result,
  className,
}: ScoreIndicatorProps): React.ReactElement {
  const homeStyle = result ? resultStyles[result].home : 'text-brew-50';
  const awayStyle = result ? resultStyles[result].away : 'text-brew-50';

  return (
    <div
      className={cn('flex items-center gap-3', className)}
      aria-label={`Score: ${homeTeam ?? 'Home'} ${homeScore} – ${awayScore} ${awayTeam ?? 'Away'}`}
    >
      {homeTeam && <span className="text-sm text-brew-400 truncate">{homeTeam}</span>}
      <div className="flex items-center gap-1.5 font-mono">
        <span className={cn('text-2xl font-bold tabular-nums', homeStyle)}>
          {homeScore.toFixed(2)}
        </span>
        <span className="text-sm text-brew-600">–</span>
        <span className={cn('text-2xl font-bold tabular-nums', awayStyle)}>
          {awayScore.toFixed(2)}
        </span>
      </div>
      {awayTeam && <span className="text-sm text-brew-400 truncate">{awayTeam}</span>}
    </div>
  );
}
