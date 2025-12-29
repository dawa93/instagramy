'use client';

import { PropsWithChildren, useState } from 'react';
import { ProfileUser } from '../model/user';
import useSWR from 'swr';

import { PostIcon, BookmarkIcon, HeartIcon } from './ui/icons';
import PostGrid from './PostGrid';

interface Props extends PropsWithChildren {
  user: ProfileUser;
}

const tabList = [
  { type: 'posts', icon: <PostIcon /> },
  { type: 'saved', icon: <BookmarkIcon className="w-3 h-3" /> },
  { type: 'liked', icon: <HeartIcon className="w-3 h-3" /> },
];

function UserPost({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabList[0].type);

  return (
    <section>
      <ul className="flex justify-center">
        {tabList.map(({ type, icon }) => {
          return (
            <li
              className={`flex items-center gap-2 mx-12 p-4 cursor-pointer border-black ${type === query && 'font-bold border-t'}`}
              key={type}
              onClick={() => setQuery(type)}
            >
              <button className="scale-150 md:scale-100">{icon}</button>
              <span className="uppercase hidden md:inline">{type}</span>
            </li>
          );
        })}
      </ul>

      <PostGrid username={username} query={query} />
    </section>
  );
}

export default UserPost;
