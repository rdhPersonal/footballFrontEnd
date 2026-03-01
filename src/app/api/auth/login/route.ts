import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  const response = NextResponse.redirect(buildCognitoAuthUrl(request, codeChallenge));
  response.cookies.set('pkce_verifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 300,
    path: '/',
  });

  return response;
}

function buildCognitoAuthUrl(request: NextRequest, codeChallenge: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.COGNITO_CLIENT_ID!,
    redirect_uri: process.env.COGNITO_REDIRECT_URI!,
    scope: 'openid profile email',
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  const returnTo = request.nextUrl.searchParams.get('returnTo');
  if (returnTo) {
    params.set('state', returnTo);
  }

  return `${process.env.COGNITO_DOMAIN}/oauth2/authorize?${params}`;
}
