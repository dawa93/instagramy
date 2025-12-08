import React from 'react';
import { SimplePost } from '../model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import { parseDate } from '../utils/date';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import SmileIcon from './ui/icons/SmileIcon';

interface Props {
  post: SimplePost;
}

function PostCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar thumbnail={userImage} size="medium" highlight />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>

      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />

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

        <form className="flex border-t items-center border-neutral-300 p-3">
          <SmileIcon />
          <input
            className="w-full ml-2 border-none outline-none"
            type="text"
            placeholder="add a comment..."
          />
          <button className="font-bold text-sky-500 ml-2">Post</button>
        </form>
      </div>
    </article>
  );
}

export default PostCard;
