'use client';

import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilled,
  HeartIcon,
} from './ui/icons';
import { parseDate } from '../utils/date';
import { PropsWithChildren, useEffect, useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import { SimplePost } from '../model/post';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import usePosts from '../hooks/posts';
import useMe from '../hooks/me';

interface Props extends PropsWithChildren {
  post: SimplePost;
}

function ActionBar({ children, post }: Props) {
  const { id, likes, createdAt } = post;

  const { setLike } = usePosts();
  const { user, setBookMark } = useMe();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  const handleBookmark = (bookmark: boolean) => {
    if (user) {
      setBookMark(id, bookmark);
    }
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFilled />}
          offIcon={<HeartIcon />}
        />

        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFilledIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>

      <div className="px-4 py-1">
        <p className="text-small font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {children}

        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}

export default ActionBar;
