import { NextRequest, NextResponse } from 'next/server';

import { dislikePost, likePost } from '@/src/service/posts';
import { withSessionUser } from '@/src/utils/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('bad request', { status: 401 });
    }

    const request = like ? likePost : dislikePost;
    return request(id, user.id)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
