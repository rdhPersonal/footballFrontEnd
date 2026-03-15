import { Badge, Card } from '@/design-system';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';

export default async function Home(): Promise<React.ReactElement> {
  const user = await getCurrentUser();

  if (user) {
    redirect('/players/search');
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(194,76,255,0.22),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(212,168,67,0.2),_transparent_30%),linear-gradient(180deg,_rgba(10,10,15,1),_rgba(18,17,26,1))] px-6 py-12">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(212,168,67,0.06)_50%,transparent_100%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.35fr_1fr]">
          <section className="flex flex-col justify-center">
            <Badge className="w-fit border border-vegas-gold/30 bg-vegas-gold/10 text-vegas-gold">
              Cognito Sign-In
            </Badge>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight text-brew-50 lg:text-7xl">
              Sign in and start scouting players immediately.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brew-300">
              This first integrated experience takes you from Cognito login into a real player scouting workflow:
              search criteria, filtered results, and a player detail page with profile data, fantasy scoring, and stat tables.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/api/auth/login?returnTo=/players/search"
                className="inline-flex items-center justify-center rounded-md bg-vegas-gold px-6 py-3 text-base font-semibold text-brew-950 shadow-[0_0_30px_rgba(212,168,67,0.15)] transition-colors hover:bg-vegas-champagne"
              >
                Sign In With Cognito
              </a>
              <p className="text-sm text-brew-400">
                Secure hosted login. Tokens stay server-side.
              </p>
            </div>
          </section>

          <section className="grid gap-4 self-center">
            <Card className="border-vegas-gold/20 bg-brew-900/90 backdrop-blur">
              <Card.Body>
                <p className="text-xs uppercase tracking-[0.28em] text-vegas-gold/80">
                  Experience Flow
                </p>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-sm text-brew-500">01</p>
                    <h2 className="mt-1 text-xl font-semibold text-brew-50">Search Players</h2>
                    <p className="mt-2 text-sm text-brew-300">
                      Name, position, team, and season filters help narrow the field fast.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-brew-500">02</p>
                    <h2 className="mt-1 text-xl font-semibold text-brew-50">Review Results</h2>
                    <p className="mt-2 text-sm text-brew-300">
                      Scan a sortable list of matching players and jump directly to detail.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-brew-500">03</p>
                    <h2 className="mt-1 text-xl font-semibold text-brew-50">Inspect Detail</h2>
                    <p className="mt-2 text-sm text-brew-300">
                      Profile data, weekly fantasy scoring, per-category stats, and roster history all in one place.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="bg-brew-900/70 backdrop-blur">
              <Card.Body>
                <p className="text-sm font-medium text-brew-50">Why this approach</p>
                <p className="mt-2 text-sm leading-7 text-brew-300">
                  The login uses the Cognito PKCE flow already defined in the frontend architecture, and the player pages
                  consume the shared backend contract so the UI and API stay aligned as we build forward.
                </p>
              </Card.Body>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
