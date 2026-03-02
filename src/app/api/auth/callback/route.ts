import { NextRequest, NextResponse } from 'next/server';
import {
  getSessionFromRequest,
  decodeTokenPayload,
  type TokenSet,
} from '@/lib/session';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const code = request.nextUrl.searchParams.get('code');
  const stateParam = request.nextUrl.searchParams.get('state');
  const codeVerifier = request.cookies.get('pkce_verifier')?.value;

  if (!code || !codeVerifier) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  const { nonce, returnTo } = extractOAuthState(request);
  if (!nonce || nonce !== stateParam) {
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

  const response = NextResponse.redirect(new URL(returnTo, request.url));

  const session = await getSessionFromRequest(request, response);
  session.idToken = tokens.id_token;
  session.accessToken = tokens.access_token;
  session.refreshToken = tokens.refresh_token ?? '';

  const payload = decodeTokenPayload(tokens.id_token);
  session.expiresAt = (payload?.exp as number) ?? Math.floor(Date.now() / 1000) + tokens.expires_in;

  await session.save();

  response.cookies.delete('pkce_verifier');
  response.cookies.delete('oauth_state');

  return response;
}

function extractOAuthState(request: NextRequest): { nonce: string | null; returnTo: string } {
  const raw = request.cookies.get('oauth_state')?.value;
  if (!raw) return { nonce: null, returnTo: '/' };

  try {
    const parsed = JSON.parse(raw);
    return {
      nonce: typeof parsed.nonce === 'string' ? parsed.nonce : null,
      returnTo: typeof parsed.returnTo === 'string' ? parsed.returnTo : '/',
    };
  } catch {
    return { nonce: null, returnTo: '/' };
  }
}
