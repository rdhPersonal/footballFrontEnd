import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { cn } from '../lib/cn';
import type { PlayerData } from './types';

interface PlayerMiniCardProps {
  player: PlayerData;
  size?: 'sm' | 'md';
  className?: string;
}

const injuryLabel: Record<NonNullable<PlayerData['injuryStatus']>, string> = {
  healthy: '',
  questionable: 'Q',
  doubtful: 'D',
  out: 'OUT',
  ir: 'IR',
};

export function PlayerMiniCard({
  player,
  size = 'md',
  className,
}: PlayerMiniCardProps): React.ReactElement {
  const isSm = size === 'sm';
  const showInjury =
    player.injuryStatus && player.injuryStatus !== 'healthy';
  const injuryText = player.injuryStatus
    ? injuryLabel[player.injuryStatus]
    : '';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Avatar
        name={player.name}
        src={player.photoUrl}
        size={isSm ? 'sm' : 'md'}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span
          className={cn(
            'truncate font-medium leading-tight text-brew-50',
            isSm ? 'text-xs' : 'text-sm',
          )}
        >
          {player.name}
        </span>
        <div className="flex items-center gap-1.5">
          <Badge variant="position" size="sm">
            {player.position}
          </Badge>
          <span className="text-xs text-brew-400">{player.teamAbbr}</span>
          {showInjury && (
            <Badge variant="status" status={player.injuryStatus} size="sm">
              {injuryText}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
