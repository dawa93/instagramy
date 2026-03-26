'use client';

import { PropsWithChildren } from 'react';

import useMe from '../hooks/me';
import usePosts from '../hooks/posts';
import { Comment, SimplePost } from '../model/post';
import { parseDate } from '../utils/date';

import CommentFrom from './CommentFrom';
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HeartFilled,
  HeartIcon,
} from './ui/icons';
import ToggleButton from './ui/ToggleButton';

interface Props extends PropsWithChildren {
  post: SimplePost;
  onComment: (comment: Comment) => void;
}

function ActionBar({ children, post, onComment }: Props) {
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

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFilled />}
          offIcon={<HeartIcon />}
          title={liked ? 'unlike' : 'liked'}
        />

        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFilledIcon />}
          offIcon={<BookmarkIcon />}
          title={bookmarked ? 'unbookmark' : 'unbookmark'}
        />
      </div>

      <div className="px-4 py-1">
        <p className="text-small font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {children}

        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>

      <CommentFrom onPostComment={handleComment} />
    </>
  );
}

export default ActionBar;
