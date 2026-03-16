import { NextRequest, NextResponse } from 'next/server';
import {
  getSession,
  isTokenExpired,
  refreshTokens,
  decodeTokenPayload,
} from './session';

/**
 * Proxies a GET request to the AWS API Gateway, handling session validation
 * and token refresh transparently. All BFF data routes use this.
 */
export async function proxyToAws(
  request: NextRequest,
  awsPath: string,
): Promise<NextResponse> {
  const session = await getSession();

  if (!session.idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (isTokenExpired(session.expiresAt)) {
    const newTokens = await refreshTokens(session.refreshToken);
    if (!newTokens) {
      session.destroy();
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    session.idToken = newTokens.id_token;
    if (newTokens.refresh_token) {
      session.refreshToken = newTokens.refresh_token;
    }

    const payload = decodeTokenPayload(newTokens.id_token);
    session.expiresAt = (payload?.exp as number) ?? Math.floor(Date.now() / 1000) + newTokens.expires_in;

    await session.save();
  }

  const queryString = request.nextUrl.search;
  const awsUrl = `${process.env.AWS_API_BASE_URL}${awsPath}${queryString}`;

  const awsResponse = await fetch(awsUrl, {
    headers: {
      'Authorization': `Bearer ${session.idToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!awsResponse.ok) {
    const status = awsResponse.status === 403 ? 403 : awsResponse.status >= 500 ? 502 : awsResponse.status;
    console.error(`AWS API error: ${awsResponse.status} for ${awsPath}`);
    return NextResponse.json({ error: 'Request failed' }, { status });
  }

  const data = await awsResponse.json();
  return NextResponse.json(data);
}
