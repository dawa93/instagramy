'use client';

import { PropsWithChildren } from 'react';
import { ProfileUser } from '../model/user';
import Button from './Button';
import useMe from '../hooks/me';

interface Props extends PropsWithChildren {
  user: ProfileUser;
}

function FollowButton({ user }: Props) {
  const { user: loggedInUser } = useMe();

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
