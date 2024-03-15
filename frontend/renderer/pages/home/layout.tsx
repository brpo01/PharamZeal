export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-white dark:bg-[#313338]'>
        <div className='flex'>
          <div>hello sidebar </div>
          {children}
        </div>
      </body>
    </html>
  );
}
