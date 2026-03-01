import { NextRequest, NextResponse } from 'next/server';
import {
  getSessionFromRequest,
  decodeTokenPayload,
  type TokenSet,
} from '@/lib/session';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const codeVerifier = request.cookies.get('pkce_verifier')?.value;

  if (!code || !codeVerifier) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  const tokenResponse = await fetch(`${process.env.COGNITO_DOMAIN}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.COGNITO_CLIENT_ID!,
      redirect_uri: process.env.COGNITO_REDIRECT_URI!,
      code,
      code_verifier: codeVerifier,
    }),
  });

  if (!tokenResponse.ok) {
    console.error('Token exchange failed:', await tokenResponse.text());
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  const tokens: TokenSet = await tokenResponse.json();

  const redirectTo = state || '/';
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  const session = await getSessionFromRequest(request, response);
  session.idToken = tokens.id_token;
  session.accessToken = tokens.access_token;
  session.refreshToken = tokens.refresh_token ?? '';

  const payload = decodeTokenPayload(tokens.id_token);
  session.expiresAt = (payload?.exp as number) ?? Math.floor(Date.now() / 1000) + tokens.expires_in;

  await session.save();

  response.cookies.delete('pkce_verifier');

  return response;
}
