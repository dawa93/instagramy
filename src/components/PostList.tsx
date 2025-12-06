'use client';

import useSWR from 'swr';
import { SimplePost } from '../model/post';

function PostList() {
  const {
    data: postList,
    isLoading,
    error,
  } = useSWR<SimplePost[]>('/api/post');

  console.log('postList', postList);

  return (
    <ul>
      {postList &&
        postList.map((post, idx) => {
          return <li key={`${post.id}-${idx}`}>{post.text}</li>;
        })}
    </ul>
  );
}

export default PostList;
