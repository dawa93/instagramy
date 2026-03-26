import { NextRequest, NextResponse } from 'next/server';

import { getPost } from '@/src/service/posts';
import { withSessionUser } from '@/src/utils/session';

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    const id = (await context.params).id;

    return getPost(id).then((data) => NextResponse.json(data));
  });
}
