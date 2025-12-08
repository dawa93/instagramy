'use client';

import { BookmarkIcon, HeartIcon } from './ui/icons';
import { parseDate } from '../utils/date';

interface Props {
  likes: string[];
  username: string;
  createdAt: string;
  text: string;
}

function ActionBar({ likes, username, createdAt, text }: Props) {
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
      </div>

      <div className="px-4 py-1">
        <p className="text-small font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        <p className="">
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}

export default ActionBar;
