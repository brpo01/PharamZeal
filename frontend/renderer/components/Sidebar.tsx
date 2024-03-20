import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  LayoutDashboard,
  LibraryBig,
  BookUser,
  Pill,
  BadgePoundSterling,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-white w-48 flex flex-col justify-between fixed  border-r z-50'>
      <div>
        {/* BRAND NAME */}
        <div className='flex gap-2 mx-auto text-center text-black items-center border-b p-4 mb-6'>
          <Image
            src='/images/logo.png'
            alt='pharma zeal'
            width='20'
            height='20'
            className=''
            priority
          />

          <a className='font-bold text-lg text-black'>Pharma Zeal</a>
        </div>
        {/* BRAND NAME */}

        <ul>
          <li className='px-4 py-2 hover:text-[#396CF0] my-2'>
            <Link href='/dashboard/home'>
              <a
                className={
                  router.pathname === "/dashboard/home"
                    ? "font-bold"
                    : "text-black font-medium"
                }
              >
                <div className='flex gap-1 items-center'>
                  <LayoutDashboard size={16} />
                  Dashboard
                </div>
              </a>
            </Link>
          </li>

          <li className='px-4 py-2 hover:text-[#396CF0] my-2'>
            <Link href='/dashboard/inventory'>
              <a
                className={
                  router.pathname === "/dashboard/inventory"
                    ? "font-bold"
                    : "text-black font-medium"
                }
              >
                <div className='flex gap-1 items-center'>
                  <LibraryBig size={16} />
                  Inventory
                </div>
              </a>
            </Link>
          </li>

          <li className='px-4 py-2 hover:text-[#396CF0] my-2'>
            <Link href='/dashboard/customers'>
              <a
                className={
                  router.pathname === "/dashboard/customers"
                    ? "font-bold"
                    : "text-black font-medium"
                }
              >
                <div className='flex gap-1 items-center'>
                  <BookUser size={16} />
                  Customers
                </div>
              </a>
            </Link>
          </li>

          <li className='px-4 py-2 hover:text-[#396CF0] my-2'>
            <Link href='/dashboard/drugs'>
              <a
                className={
                  router.pathname === "/dashboard/drugs"
                    ? "font-bold"
                    : "text-black font-medium"
                }
              >
                <div className='flex gap-1 items-center'>
                  <Pill size={16} />
                  Drugs
                </div>
              </a>
            </Link>
          </li>

          <li className='px-4 py-2 hover:text-[#396CF0] my-2'>
            <Link href='/dashboard/sales'>
              <a
                className={
                  router.pathname === "/dashboard/sales"
                    ? "font-bold"
                    : "text-black font-medium"
                }
              >
                <div className='flex gap-1 items-center'>
                  <BadgePoundSterling size={16} />
                  Sales
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className='p-4'>
        <Link href='/auth/login'>
          <a className='text-black font-semibold hover:text-[#396CF0]'>Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
