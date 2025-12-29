import { PropsWithChildren } from 'react';
import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { SimplePost } from '../model/post';
import PostGridCard from './PostGridCard';

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
    <div>
      {isLoading && <GridSpinner />}
      <ul>
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
