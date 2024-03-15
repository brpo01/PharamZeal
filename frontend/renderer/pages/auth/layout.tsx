import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-white dark:bg-[#313338]'>
        <div className='flex'>{children}</div>
      </body>
    </html>
  );
}
