import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]/route';

import { follow, unfollow } from '@/src/service/user';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response('bad request', { status: 401 });
  }

  const request = isFollow ? follow : unfollow;
  return request(user.id, targetId)
    .then(data => NextResponse.json(data))
    .catch(err => new Response(JSON.stringify(err), { status: 500 }));
}
