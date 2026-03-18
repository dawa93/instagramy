import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]/route';

import { addComment } from '@/src/service/posts';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id, comment } = await req.json();

  if (!id || comment === undefined) {
    return new Response('bad request', { status: 401 });
  }

  return addComment(id, user.id, comment)
    .then(data => NextResponse.json(data))
    .catch(err => new Response(JSON.stringify(err), { status: 500 }));
}
