import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className='h-full bg-gray-800 text-white w-48 flex flex-col justify-between fixed'>
      <div>
        <div className='p-4 text-center text-gray-500'>
          <Link href='/'>
            <a className='text-white font-bold text-lg'>Your Logo</a>
          </Link>
        </div>
        <ul>
          <li className='px-4 py-2 hover:bg-gray-700'>
            <Link href='/dashboard/home'>
              <a
                className={
                  router.pathname === "/dashboard/home" ? "font-bold" : ""
                }
              >
                Home
              </a>
            </Link>
          </li>
          <li className='px-4 py-2 hover:bg-gray-700'>
            <Link href='/dashboard/inventory'>
              <a
                className={
                  router.pathname === "/dashboard/inventory" ? "font-bold" : ""
                }
              >
                Inventory
              </a>
            </Link>
          </li>
          <li className='px-4 py-2 hover:bg-gray-700'>
            <Link href='/dashboard/customer'>
              <a
                className={
                  router.pathname === "/dashboard/customer" ? "font-bold" : ""
                }
              >
                Customer
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
