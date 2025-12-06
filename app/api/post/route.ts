import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUserByUsername } from '@/src/service/user';
import { NextResponse } from 'next/server';
import { getFollowingPostsOf } from '@/src/service/post';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return getFollowingPostsOf(user.username).then(data =>
    NextResponse.json(data),
  );
}
