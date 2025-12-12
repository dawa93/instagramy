'use client';

import useSWR from 'swr';
import { SimplePost } from '../model/post';

import PostCard from './PostCard';
import GridSpinner from './ui/GridSpinner';

function PostList() {
  const {
    data: postList,
    isLoading,
    error,
  } = useSWR<SimplePost[]>('/api/posts');

  console.log('postList', postList);

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}

      {postList && (
        <ul>
          {postList.map((post, idx) => {
            return (
              <li key={`${post.id}-${idx}`} className="mb-4">
                <PostCard post={post} priority={idx < 2 ? true : false} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default PostList;
