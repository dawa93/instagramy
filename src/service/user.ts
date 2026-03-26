import { SearchUser } from '../model/user';

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

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == 'user' && username == "${username}"][0]{
      ...,
      "id" : _id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmark":bookmarks[]->_id
    }`,
  );
}

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : ``;

  return client
    .fetch(
      `*[_type == "user" ${query}]{
        ...,
        "following": count(following),
        "followers": count(followers),
      }`,
    )
    .then(users =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      })),
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
        ...,
        "id": _id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type == "post" && author->username == "${username}"]),
      }`,
    )
    .then(user => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.post ?? 0,
    }));
}

export async function addBookmarkPost(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append('likes', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmarkPost(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, user =>
      user
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }]),
    )
    .patch(targetId, user =>
      user
        .setIfMissing({ followers: [] })
        .append('followers', [{ _ref: myId, _type: 'reference' }]),
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, user => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, user => user.unset([`following[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
