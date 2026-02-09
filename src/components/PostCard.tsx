'use client';

import { SimplePost } from '../model/post';
import Avatar from './Avatar';
import Image from 'next/image';

import CommentFrom from './CommentFrom';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';

interface Props {
  post: SimplePost;
  priority?: boolean;
}

function PostCard({ post, priority }: Props) {
  const { userImage, username, image, createdAt, likes, text, comments } = post;
  console.log('post', post);
  const [openModal, setOpenModal] = useState(false);

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar userImage={userImage || ''} username={username} />

      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />

      <ActionBar post={post}>
        {text && (
          <p className="">
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        {comments > 1 && (
          <button
            className="font-bold my-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`view all ${comments} comments`}</button>
        )}
      </ActionBar>
      <CommentFrom />

      {openModal && (
        <ModalPortal>
          <PostModal
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}

export default PostCard;
