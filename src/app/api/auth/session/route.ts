import { NextResponse } from 'next/server';
import { getSession, decodeTokenPayload } from '@/lib/session';

export interface SessionUser {
  sub: string;
  email: string;
  name?: string;
}

export async function GET(): Promise<NextResponse> {
  const session = await getSession();

  if (!session.idToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const payload = decodeTokenPayload(session.idToken);
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user: SessionUser = {
    sub: payload.sub as string,
    email: (payload.email as string) ?? '',
    name: (payload.name as string) ?? (payload.email as string) ?? '',
  };

  return NextResponse.json({ user });
}
