import { NextRequest, NextResponse } from 'next/server';

import { searchUsers } from '@/src/service/user';

interface Context {
  params: { keyword: string };
}

export async function GET(_: NextRequest, context: Context) {
  const keyword = (await context.params).keyword;

  return searchUsers(keyword).then((data) => NextResponse.json(data));
}
