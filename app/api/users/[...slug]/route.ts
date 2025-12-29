import { NextRequest, NextResponse } from 'next/server';
import { getLikedOf, getPostOf, getSavedPostsOf } from '@/src/service/posts';

interface Context {
  params: {
    slug: string[];
  };
}

export async function GET(_: NextRequest, context: Context) {
  // const keyword = (await context.params).keyword;
  const { slug } = await context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextRequest('Bad Request');
  }

  const [username, query] = slug;

  let request = getPostOf;
  if (query === 'saved') {
    request = getSavedPostsOf;
  } else if (query === 'liked') {
    request = getLikedOf;
  }

  return request(username).then(data => NextResponse.json(data));
}
