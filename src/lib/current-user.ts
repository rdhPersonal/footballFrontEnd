import { decodeTokenPayload, getSession } from '@/lib/session';

export interface CurrentUser {
  sub: string;
  email: string;
  name: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();

  if (!session.idToken) {
    return null;
  }

  const payload = decodeTokenPayload(session.idToken);
  if (!payload) {
    return null;
  }

  return {
    sub: payload.sub as string,
    email: (payload.email as string) ?? '',
    name: (payload.name as string) ?? (payload.email as string) ?? '',
  };
}
