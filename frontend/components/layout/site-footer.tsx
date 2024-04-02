import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full border-t bg-background absolute bottom-0 z-50'>
      <section
        id='footer-content'
        aria-labelledby='footer-content-heading'
        className='flex justify-between space-x-4 w-full items-center px-8 py-2'
      >
        <div className='text-base leading-loose'>&copy; {currentYear}</div>
        <Link
          href='/'
          className='z-20 flex items-center text-lg font-bold tracking-tight'
        >
          <span>Pharma Zeal</span>
        </Link>
        <div className='flex items-center space-x-1'>
          <ThemeToggle />
        </div>
      </section>
    </footer>
  );
}
