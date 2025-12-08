'use client';

import useSWR from 'swr';
import { SimplePost } from '../model/post';
import { GridLoader } from 'react-spinners';
import PostCard from './PostCard';

function PostList() {
  const {
    data: postList,
    isLoading,
    error,
  } = useSWR<SimplePost[]>('/api/post');

  console.log('postList', postList);

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridLoader color="red" />
        </div>
      )}

      {postList && (
        <ul>
          {postList.map((post, idx) => {
            return (
              <li key={`${post.id}-${idx}`} className="mb-4">
                <PostCard post={post} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default PostList;
