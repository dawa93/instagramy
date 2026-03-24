import { NextRequest, NextResponse } from 'next/server';

import { addBookmarkPost, removeBookmarkPost } from '@/src/service/user';
import { withSessionUser } from '@/src/utils/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new Response('bad request', { status: 401 });
    }

    const request = bookmark ? addBookmarkPost : removeBookmarkPost;
    return request(user.id, id)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
