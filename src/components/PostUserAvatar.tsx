import { PropsWithChildren } from 'react';

import Avatar from './Avatar';

interface Props extends PropsWithChildren {
  username: string;
  userImage: string;
}

function PostUserAvatar({ userImage, username }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar thumbnail={userImage} size="medium" highlight />
      <span className="text-gray-900 font-bold ml-2">{username}</span>
    </div>
  );
}

export default PostUserAvatar;
