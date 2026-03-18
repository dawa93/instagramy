'use client';

import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';

import useMe from '../hooks/me';

import Avatar from './Avatar';
import ScrollableBar from './ScrollableBar';


function FollowingBar() {
  const { user, isLoading, error } = useMe();
  const users = user?.following || [];
  // const users = user?.following
  // ? [
  //     ...user?.following,
  //     ...user?.following,
  //     ...user?.following,
  //     ...user?.following,
  //     ...user?.following,
  //     ...user?.following,
  //   ]
  // : [];
  console.log('user', user);

  return (
    <section className="w-full felx justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users?.length === 0) && <p>you don`t have following</p>
      )}

      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map((user, idx) => (
            <Link
              className="flex flex-col items-center w-20"
              href={`/user/${user.username}`}
              key={`${user.username}-${idx}`}
            >
              <Avatar thumbnail={user.image} highlight />
              <p className="w-full text-center text-sm text-ellipsis overflow-hidden">
                {user.username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
      <div></div>
      <div></div>
    </section>
  );
}

export default FollowingBar;
