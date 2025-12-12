'use client';

import { PropsWithChildren } from 'react';
import useSWR from 'swr';
import { HomeUser, ProfileUser } from '../model/user';
import Button from './Button';

interface Props extends PropsWithChildren {
  user: ProfileUser;
}

function FollowButton({ user }: Props) {
  const { data: loggedInUser } = useSWR<HomeUser>(`/api/me`);

  const showButton = loggedInUser && loggedInUser.username !== user.username;
  const following =
    loggedInUser &&
    loggedInUser?.following.find(item => item.username === user.username);
  const buttonText = following ? 'Unfollow' : 'Follow';

  return (
    <>
      {showButton && (
        <Button
          text={buttonText}
          onClick={() => {}}
          red={buttonText === 'Unfollow'}
        />
      )}
    </>
  );
}

export default FollowButton;
