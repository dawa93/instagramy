import { SimplePost } from '../model/post';
import Avatar from './Avatar';
import Image from 'next/image';

import CommentFrom from './CommentFrom';
import ActionBar from './ActionBar';

interface Props {
  post: SimplePost;
  priority?: boolean;
}

function PostCard({ post, priority }: Props) {
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
        priority={priority}
      />

      <ActionBar
        likes={likes}
        username={username}
        createdAt={createdAt}
        text={text}
      />
      <CommentFrom />
    </article>
  );
}

export default PostCard;
