'use client';

import useSWR from 'swr';

function FollowingBar() {
  const { data, isLoading, error } = useSWR('/api/me');
  console.log('data', data);

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
}

export default FollowingBar;
