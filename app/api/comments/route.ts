import { NextRequest, NextResponse } from 'next/server';

import { addComment } from '@/src/service/posts';
import { withSessionUser } from '@/src/utils/session';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await req.json();

    if (!id || comment === undefined) {
      return new Response('bad request', { status: 401 });
    }

    return addComment(id, user.id, comment)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
