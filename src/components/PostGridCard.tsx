'use client';

import { PropsWithChildren, useState } from 'react';
import { SimplePost } from '../model/post';
import Image from 'next/image';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';

interface Props extends PropsWithChildren {
  post: SimplePost;
  priority: boolean;
}

function PostGridCard({ post, priority }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
      />

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
    </div>
  );
}

export default PostGridCard;
