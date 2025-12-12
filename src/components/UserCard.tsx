import { PropsWithChildren } from 'react';
import { SearchUser } from '../model/user';
import Link from 'next/link';
import Avatar from './Avatar';

interface Props extends PropsWithChildren {
  user: SearchUser;
}

function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex gap-2 items-center w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
    >
      <Avatar thumbnail={image} />
      <div className="text-neutral-500">
        <p className="text-black font-bold leading-4">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}

export default UserCard;
