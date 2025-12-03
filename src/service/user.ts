import { client } from './sanity';

interface OAuthUser {
  id: string;
  username: string;
  email: string | null;
  name: string | null;
  image?: string | null;
}

export async function addUser({ username, email, name, image, id }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username: username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}
