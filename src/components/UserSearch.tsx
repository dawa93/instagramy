'use client';

import { PropsWithChildren, useState } from 'react';
import useSWR from 'swr';

interface Props extends PropsWithChildren {
  // : ;
}

function UserSearch({}: Props) {
  const [keyword, setKeyword] = useState('');
  const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);

  console.log('data@!#!@#!@#!@#', data);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default UserSearch;
