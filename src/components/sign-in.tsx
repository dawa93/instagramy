'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

import ColorButton from './ui/ColorButton';

interface Props {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}

function SignIn({ providers, callbackUrl }: Props) {
  console.log('callbackUrl in client', callbackUrl);
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={name}
          text={`sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
        />
      ))}
    </>
  );
}

export default SignIn;
