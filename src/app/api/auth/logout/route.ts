import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET(): Promise<NextResponse> {
  const session = await getSession();
  session.destroy();

  const logoutUrl = new URL(`${process.env.COGNITO_DOMAIN}/logout`);
  logoutUrl.searchParams.set('client_id', process.env.COGNITO_CLIENT_ID!);
  logoutUrl.searchParams.set('logout_uri', process.env.COGNITO_LOGOUT_URI!);

  return NextResponse.redirect(logoutUrl);
}
