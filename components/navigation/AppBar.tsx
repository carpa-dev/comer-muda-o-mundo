import Link from 'next/link';
import { memo } from 'react';

export const AppBar = memo(function AppBar() {
  return (
    <header className="w-full h-12 fixed px-4 py-2 z-10 bg-yellow-300 shadow">
      <nav className="w-full h-full flex items-center justify-between">
        <Link href="/">
          <a className="inline-block font-bold text-teal-500 tracking-wide">
            cmom
          </a>
        </Link>

        <div className="flex items-center -mx-2">
          <Link href="/">
            <a className="inline-block px-2 font-medium transition duration-200 ease-in-out hover:text-teal-700">
              mapa
            </a>
          </Link>
          <Link href="/sobre">
            <a className="inline-block px-2 font-medium transition duration-200 ease-in-out hover:text-teal-700">
              sobre
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
});
