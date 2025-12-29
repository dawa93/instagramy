import UserPost from '@/src/components/UserPost';
import UserProfile from '@/src/components/UserProfile';
import { getUserForProfile } from '@/src/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: { username: string };
}

const getUser = cache(async (username: string) => getUserForProfile(username));

async function Page({ params }: Props) {
  const { username } = await params;
  const user = await getUser(username);

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUser(username);

  return {
    title: `${user?.name} - Instagramy Photos`,
    description: `${user?.name}'s all Instagramy posts`,
  };
}
