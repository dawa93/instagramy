import UserSearch from '@/src/components/UserSearch';
import { Metadata } from 'next';

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
