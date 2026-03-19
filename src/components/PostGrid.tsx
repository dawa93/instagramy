import { PropsWithChildren } from 'react';

import PostGridCard from './PostGridCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '../hooks/posts';

function PostGrid() {
  const { posts: postList, isLoading } = usePosts();

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
