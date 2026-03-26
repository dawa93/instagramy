'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState, useTransition } from 'react';

import { PulseLoader } from 'react-spinners';

import useMe from '../hooks/me';
import { ProfileUser } from '../model/user';

import Button from './Button';

interface Props extends PropsWithChildren {
  user: ProfileUser;
}

function FollowButton({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isUpdating = isPending || isFetching;

  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser?.following.find((item) => item.username === username);
  const buttonText = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);

    await toggleFollow(user.id, !following);

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute inset-0 flex justify-center items-center z-20">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={buttonText}
            onClick={handleFollow}
            red={buttonText === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
}

export default FollowButton;
