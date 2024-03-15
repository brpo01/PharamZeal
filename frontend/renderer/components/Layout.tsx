import React from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-white dark:bg-[#313338]'>
        <nav>
          <Link href='/dashboard/home'>
            <a className='btn-blue'>home</a>
          </Link>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  );
}
