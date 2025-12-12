'use client';

import { FormEvent, PropsWithChildren, useState } from 'react';
import useSWR from 'swr';
import { ProfileUSer } from '../model/user';
import GridSpinner from './ui/GridSpinner';
import UserCard from './UserCard';
import useDebounce from '../hooks/useDebounce';

interface Props extends PropsWithChildren {
  // : ;
}

function UserSearch({}: Props) {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUSer[]>(`/api/search/${debouncedKeyword}`);

  console.log('users data@!#!@#!@#!@#', users);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault;
  };

  return (
    <section className="w-full max-w-2xl flex flex-col items-center my-4">
      <form onSubmit={onSubmit} className="w-full mb-4">
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          autoFocus
          placeholder="Search for a username or user"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
      </form>

      {error && <p>무언가가 잘못 되었음</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}

      <ul className="w-full p-4">
        {users &&
          users.map(user => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default UserSearch;
