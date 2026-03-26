import { Metadata } from 'next';

import UserSearch from '@/src/components/UserSearch';

export const dynamic = 'force-dynamic'; // 강제로 동적 요청으로 변경

export const metadata: Metadata = {
  title: 'User Search',
  description: 'search users to follow',
};

function Page() {
  return (
    <>
      <UserSearch />
    </>
  );
}

export default Page;
