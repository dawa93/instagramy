'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

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

  return (
    <header className="sticky top-0 bg-white z-10 border-b">
      <div className="flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="text-3xl font-bold">Instagramy</h1>
        </Link>
        <nav>
          <ul className="flex gap-4 items-center p-4">
            {menuList.map(menu => {
              return (
                <li>
                  <Link href={menu.href} key={menu.href}>
                    {pathname === menu.href ? menu.clickedIcon : menu.icon}
                  </Link>
                </li>
              );
            })}
            <ColorButton text="sign in" onClick={() => {}} />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
