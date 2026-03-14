import { NextRequest, NextResponse } from 'next/server';
import { proxyToAws } from '@/lib/bff-proxy';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return proxyToAws(request, '/teams');
}
