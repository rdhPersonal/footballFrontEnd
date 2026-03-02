import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  const stateNonce = crypto.randomBytes(16).toString('base64url');
  const returnTo = sanitizeReturnTo(
    request.nextUrl.searchParams.get('returnTo'),
  );

  const response = NextResponse.redirect(
    buildCognitoAuthUrl(codeChallenge, stateNonce),
  );

  response.cookies.set('pkce_verifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 300,
    path: '/',
  });

  response.cookies.set(
    'oauth_state',
    JSON.stringify({ nonce: stateNonce, returnTo }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 300,
      path: '/',
    },
  );

  return response;
}

function sanitizeReturnTo(raw: string | null): string {
  if (!raw) return '/';
  try {
    const url = new URL(raw, 'http://localhost');
    if (url.origin !== 'http://localhost') return '/';
    if (url.pathname.startsWith('//')) return '/';
    return url.pathname + url.search;
  } catch {
    return '/';
  }
}

function buildCognitoAuthUrl(codeChallenge: string, stateNonce: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.COGNITO_CLIENT_ID!,
    redirect_uri: process.env.COGNITO_REDIRECT_URI!,
    scope: 'openid profile email',
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    state: stateNonce,
  });

  return `${process.env.COGNITO_DOMAIN}/oauth2/authorize?${params}`;
}
