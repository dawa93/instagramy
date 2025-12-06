import React from 'react';
import { User } from '../model/user';
import Avatar from './Avatar';

interface Props {
  user: User;
}

function Sidebar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar thumbnail={image} />}
        <p className="font-bold">{username}</p>
        <p className="text-lg text-neutral-500 leading-4">{name}</p>
      </div>

      <p className="text-sm text-neutral-500 mt-8">
        About · Help · Press · API · Jobs · Privacy · Terms · Location ·
        Language
      </p>
      <p className="font-bold text-sm mt-8 text-neutral-500">
        @Copyright INSTAGRAMY from METAL
      </p>
    </>
  );
}

export default Sidebar;
