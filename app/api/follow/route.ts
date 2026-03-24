import { NextRequest, NextResponse } from 'next/server';

import { follow, unfollow } from '@/src/service/user';
import { withSessionUser } from '@/src/utils/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow === undefined) {
      return new Response('bad request', { status: 401 });
    }

    const request = isFollow ? follow : unfollow;
    return request(user.id, targetId)
      .then((data) => NextResponse.json(data))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
