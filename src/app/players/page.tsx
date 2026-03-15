import { redirect } from 'next/navigation';

export default function PlayersIndexPage(): never {
  redirect('/players/search');
}
