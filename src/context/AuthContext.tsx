'use client';

import { SessionProvider } from 'next-auth/react';

function AuthContext({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthContext;
