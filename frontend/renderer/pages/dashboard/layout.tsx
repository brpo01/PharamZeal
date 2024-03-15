import React from "react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-white dark:bg-[#313338]'>
        <nav>
          <Link href='/home'>
            <a className='btn-blue'>Go to home page</a>
          </Link>
        </nav>
        <div className='flex'>{children}</div>
      </body>
    </html>
  );
}
