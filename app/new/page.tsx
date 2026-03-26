import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]/route';

import NewPost from '@/src/components/NewPost';

export const metadata: Metadata = {
  title: 'New post',
  description: 'Create a new post',
};

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div>
      <NewPost user={session.user} />
    </div>
  );
}

export default Page;
