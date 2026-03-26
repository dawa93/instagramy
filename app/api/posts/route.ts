import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]/route';

import { createPost, getFollowingPostsOf } from '@/src/service/posts';
import { withSessionUser } from '@/src/utils/session';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username) //
    .then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get('text')?.toString() || '';
    const file = form.get('file') as Blob;

    if (!file || !text) {
      return new Response('bad request', { status: 401 });
    }

    return createPost(user.id, text, file) //
      .then((data) => NextResponse.json(data));
  });
}
