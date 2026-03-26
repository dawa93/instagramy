import { NextRequest, NextResponse } from 'next/server';

import { searchUsers } from '@/src/service/user';

export async function GET(
  _: NextRequest,
  context: RouteContext<'/api/search/[keyword]'>,
) {
  const keyword = (await context.params).keyword;

  return searchUsers(keyword).then((data) => NextResponse.json(data));
}

// Or
// interface Context {
//   params: Promise<{ keyword: string }>;
// }

// export async function GET(_: NextRequest, context: Context) {
//   const keyword = (await context.params).keyword;

//   return searchUsers(keyword).then((data) => NextResponse.json(data));
// }
