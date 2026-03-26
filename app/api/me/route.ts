import { NextResponse } from 'next/server';

import { getUserByUsername } from '@/src/service/user';
import { withSessionUser } from '@/src/utils/session';

export async function GET() {
  return withSessionUser(async (user) => {
    return getUserByUsername(user.username).then((data) =>
      NextResponse.json(data),
    );
  });
}
