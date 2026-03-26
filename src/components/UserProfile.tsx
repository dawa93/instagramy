import { PropsWithChildren } from 'react';

import { ProfileUser } from '../model/user';

import Avatar from './Avatar';
import FollowButton from './FollowButton';

interface Props extends PropsWithChildren {
  user: ProfileUser;
}

function UserProfile({ user }: Props) {
  const infoList = [
    { title: 'post', data: user.posts },
    { title: 'followers', data: user.followers },
    { title: 'following', data: user.following },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
      <Avatar thumbnail={user.image} highlight size="xl" />

      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="text-2xl md:mr-8 my-4 md:mb-0">{user.username}</h1>
          <FollowButton user={user} />
        </div>

        <ul className="my-4 flex gap-4">
          {infoList.map(({ title, data }, idx) => (
            <li key={idx}>
              <span className="font-bold mr-1">{data}</span> {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">
          {user.name}
        </p>
      </div>
    </section>
  );
}

export default UserProfile;
