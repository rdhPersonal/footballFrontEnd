import { NextRequest, NextResponse } from 'next/server';
import { proxyToAws } from '@/lib/bff-proxy';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  return proxyToAws(request, `/players/${id}`);
}
