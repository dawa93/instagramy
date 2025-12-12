import { searchUsers } from '@/src/service/user';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { keyword: string };
}

export async function GET(_: NextRequest, context: Context) {
  const keyword = (await context.params).keyword;

  console.log('keyword', keyword);

  return searchUsers(keyword).then(data => NextResponse.json(data));
}
