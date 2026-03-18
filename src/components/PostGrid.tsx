import { PropsWithChildren } from 'react';
import useSWR from 'swr';

import { SimplePost } from '../model/post';

import PostGridCard from './PostGridCard';
import GridSpinner from './ui/GridSpinner';

interface Props extends PropsWithChildren {
  username: string;
  query: string;
}

function PostGrid({ username, query }: Props) {
  const {
    data: postList,
    isLoading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

  console.log('postList', postList);

  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {postList &&
          postList.map((post, idx) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={idx < 6 ? true : false} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PostGrid;
