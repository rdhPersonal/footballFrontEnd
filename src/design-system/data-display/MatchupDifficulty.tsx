import { cn } from '../lib/cn';

type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

interface MatchupDifficultyProps {
  difficulty: DifficultyLevel;
  label?: string;
  className?: string;
}

const LABELS: Record<DifficultyLevel, string> = {
  1: 'Very Easy',
  2: 'Easy',
  3: 'Moderate',
  4: 'Hard',
  5: 'Very Hard',
};

const dotActiveColor: Record<DifficultyLevel, string> = {
  1: 'bg-vegas-emerald',
  2: 'bg-vegas-emerald',
  3: 'bg-vegas-amber',
  4: 'bg-vegas-crimson',
  5: 'bg-vegas-crimson',
};

export function MatchupDifficulty({
  difficulty,
  label,
  className,
}: MatchupDifficultyProps): React.ReactElement {
  const difficultyLabel = LABELS[difficulty];
  const activeColor = dotActiveColor[difficulty];

  return (
    <div
      className={cn('flex flex-col gap-1', className)}
      aria-label={`Matchup difficulty: ${difficultyLabel}`}
    >
      {label && <span className="text-xs text-brew-400">{label}</span>}
      <div className="flex items-center gap-1" role="img" aria-label={difficultyLabel}>
        {([1, 2, 3, 4, 5] as DifficultyLevel[]).map((level) => (
          <div
            key={level}
            className={cn(
              'h-2 w-5 rounded-sm transition-colors duration-200',
              level <= difficulty ? activeColor : 'bg-brew-800',
            )}
          />
        ))}
      </div>
      <span className="text-xs text-brew-400">{difficultyLabel}</span>
    </div>
  );
}
