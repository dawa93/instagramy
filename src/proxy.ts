import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;

  // 로그인 안 되었는데 다른 페이지로 접근시 로그인 페이지로 이동
  if (!token) {
    const url = req.nextUrl.clone();
    url.searchParams.set('next', `${pathname}${search}`);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
