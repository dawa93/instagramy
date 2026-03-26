import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import './globals.css';
import Navbar from '@/src/components/Navbar';
import AuthContext from '@/src/context/AuthContext';
import SWRConfigContext from '@/src/context/SWRContext';

const openSans = Open_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Instagramy',
    template: 'Instagramy | %s',
  },
  description: 'Instagramy Photos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthContext>
        <Navbar />

        <html lang="en" className={`${openSans.variable} antialiased`}>
          <body className="w-full overflow-auto bg-neutral-50 ">
            <main className="w-full flex justify-center max-w-7xl mx-auto">
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
            <div id="portal" />
          </body>
        </html>
      </AuthContext>
    </>
  );
}
