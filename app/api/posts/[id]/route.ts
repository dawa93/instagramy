import { NextRequest, NextResponse } from 'next/server';

import { getPost } from '@/src/service/posts';
import { withSessionUser } from '@/src/utils/session';

export async function GET(
  request: NextRequest,
  context: RouteContext<'/api/posts/[id]'>,
) {
  return withSessionUser(async (user) => {
    const { id } = await context.params;

    return getPost(id).then((data) => NextResponse.json(data));
  });
}

// 또는
// type Context = {
//   params: Promise<{ id: string }>;
// };
// export async function GET(request: NextRequest, context: Context) {
//   return withSessionUser(async (user) => {
//     const id = (await context.params).id;

//     return getPost(id).then((data) => NextResponse.json(data));
//   });
// }
