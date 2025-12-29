import UserPost from '@/src/components/UserPost';
import UserProfile from '@/src/components/UserProfile';
import { getUserForProfile } from '@/src/service/user';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: { username: string };
}

async function Page({ params }: Props) {
  const { username } = await params;
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPost user={user} />
    </section>
  );
}

export default Page;
