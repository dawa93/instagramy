import { PropsWithChildren } from 'react';
import { FullPost, SimplePost } from '../model/post';
import useSWR from 'swr';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentFrom from './CommentFrom';
import Avatar from './Avatar';

interface Props extends PropsWithChildren {
  post: SimplePost;
}

function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  console.log(comments);
  console.log('post detail data', data);

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="w-full object-cover aspect-square"
          src={image}
          alt={`photo by ${username}`}
          sizes="650px"
          fill
          priority
        />
      </div>

      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar userImage={userImage || ''} username={username} />

        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, idx) => (
                <li key={`${idx}`} className="flex items-center mb-1">
                  <Avatar
                    thumbnail={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              ),
            )}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
        <CommentFrom />
      </div>
    </section>
  );
}

export default PostDetail;
