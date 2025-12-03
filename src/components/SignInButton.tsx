'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import ColorButton from './ui/ColorButton';

function SignInButton({ session }: { session: Session | null }) {
  if (session) {
    return <ColorButton text="Sign out" onClick={() => signOut()} />;
  }

  return <ColorButton text="Sign in" onClick={() => signIn()} />;
}

export default SignInButton;
