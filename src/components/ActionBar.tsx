'use client';

import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilled,
  HeartIcon,
} from './ui/icons';
import { parseDate } from '../utils/date';
import { useEffect, useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import { SimplePost } from '../model/post';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import usePosts from '../hooks/posts';

interface Props {
  post: SimplePost;
}

function ActionBar({ post }: Props) {
  const { id, likes, username, createdAt, text } = post;
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);

  const { setLike } = usePosts();

  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  useEffect(() => {
    setBookmarked(user ? likes.includes(user.username) : false);
  }, [session]);

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
          onToggle={setBookmarked}
          onIcon={<BookmarkFilledIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>

      <div className="px-4 py-1">
        <p className="text-small font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {text && (
          <p className="">
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}

export default ActionBar;
