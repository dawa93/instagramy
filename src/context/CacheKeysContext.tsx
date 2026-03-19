import { createContext, useContext } from 'react';

type Props = {
  postsKey: string;
};

export const CacheKeysContext = createContext<Props>({
  postsKey: '/api/posts',
});

export const useCacheKeys = () => useContext(CacheKeysContext);
