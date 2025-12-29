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
  // `/api/users/${username}/posts`
  // `/api/users/${username}/liked`
  // `/api/users/${username}/bookmarks`
  const [query, setQuery] = useState(tabList[0].type);

  return (
    <section>
      <ul>
        {tabList.map(({ type, icon }) => {
          return (
            <li key={type} onClick={() => setQuery(type)}>
              <div>
                <button>{type}</button>
                <span>{icon}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <PostGrid username={username} query={query} />
    </section>
  );
}

export default UserPost;
