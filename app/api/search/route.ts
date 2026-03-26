import { NextResponse } from 'next/server';

import { searchUsers } from '@/src/service/user';

export const dynamic = 'force-dynamic'; // 강제로 동적 요청으로 변경

export async function GET() {
  return searchUsers().then(data => NextResponse.json(data));
}
