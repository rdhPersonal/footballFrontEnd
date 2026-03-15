import { PlayersShell } from '@/features/players/PlayersShell';

export default function PlayersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <PlayersShell>{children}</PlayersShell>;
}
