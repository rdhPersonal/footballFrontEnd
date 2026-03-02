import { getIronSession, type IronSession, type SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export interface SessionData {
  idToken: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

const SESSION_OPTIONS: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'football_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 30, // 30 days (matches refresh token validity)
    path: '/',
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, SESSION_OPTIONS);
}

export async function getSessionFromRequest(
  request: NextRequest,
  response: NextResponse,
): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(request, response, SESSION_OPTIONS);
}

export function isTokenExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt * 1000;
}

export function decodeTokenPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], 'base64url').toString('utf-8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export interface TokenSet {
  id_token: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export async function refreshTokens(refreshToken: string): Promise<TokenSet | null> {
  const response = await fetch(`${process.env.COGNITO_DOMAIN}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.COGNITO_CLIENT_ID!,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) return null;
  return response.json();
}
