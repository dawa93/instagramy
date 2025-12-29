import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import SignIn from '@/src/components/sign-in';
import { Metadata } from 'next';

interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

export const metadata: Metadata = {
  title: 'SignIn',
  description: 'signup or login to Instagramy',
};

export default async function SignPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  const { callbackUrl } = await searchParams;

  return (
    <section className="flex justify-center mt-[30%]">
      <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
