import React from "react";
import Link from "next/link";

import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-white dark:bg-[#313338] relative'>
        <div className='flex h-full'>
          <Sidebar />
          <div className='w-full'>
            {/* NAVBAR */}
            <nav className='bg-gray-800 p-4 w-full'>
              <div className='mx-auto flex justify-between items-center'>
                <ul className='flex space-x-4 justify-end w-full'>
                  <li>
                    <Link href='/dashboard/home'>
                      <a className='text-white hover:text-gray-300'>Home</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            {/* NAVBAR */}
            <div className='flex-grow container mx-auto'>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
