'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  HomeIcon,
  HomeFillHome,
  SearchFillIcon,
  SearchIcon,
  NewIcon,
  NewFillIcon,
} from './ui/icons';
import ColorButton from './ui/ColorButton';
import Link from 'next/link';
import SignInButton from './SignInButton';
import Avatar from './Avatar';

const menuList = [
  {
    icon: <HomeIcon />,
    clickedIcon: <HomeFillHome />,
    href: '/',
  },
  {
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    href: '/search',
  },
  {
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    href: '/new',
  },
];

function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <nav className="sticky top-0 bg-white z-10 border-b">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center px-6">
          <Link href="/">
            <h1 className="text-3xl font-bold">Instagramy</h1>
          </Link>
          <div>
            <ul className="flex gap-4 items-center p-4">
              {menuList.map(menu => {
                return (
                  <li key={menu.href}>
                    <Link href={menu.href}>
                      {pathname === menu.href ? menu.clickedIcon : menu.icon}
                    </Link>
                  </li>
                );
              })}

              {user && (
                <li>
                  <Link href={`/user/${user.username}`}>
                    <Avatar thumbnail={user.image} size="small" highlight />
                  </Link>
                </li>
              )}

              <li>
                <SignInButton session={session ?? null} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
