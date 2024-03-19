import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gray-800 text-white w-48 flex flex-col justify-between fixed p-4'>
      <div>
        <div className='text-center text-gray-500'>
          <Link href='/'>
            <a className='text-white font-bold text-lg'>Your Logo</a>
          </Link>
        </div>

        <ul>
          <li className='px-4 py-2 hover:bg-gray-700 hover:rounded-md'>
            <Link href='/dashboard/home'>
              <a
                className={
                  router.pathname === "/dashboard/home" ? "font-bold " : ""
                }
              >
                Dashboard
              </a>
            </Link>
          </li>

          <li className='px-4 py-2 hover:bg-gray-700 hover:rounded-md'>
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

          <li className='px-4 py-2 hover:bg-gray-700 hover:rounded-md'>
            <Link href='/dashboard/customers'>
              <a
                className={
                  router.pathname === "/dashboard/customers" ? "font-bold" : ""
                }
              >
                Customers
              </a>
            </Link>
          </li>

          <li className='px-4 py-2 hover:bg-gray-700 hover:rounded-md'>
            <Link href='/dashboard/drugs'>
              <a
                className={
                  router.pathname === "/dashboard/drugs" ? "font-bold" : ""
                }
              >
                Drugs
              </a>
            </Link>
          </li>

          <li className='px-4 py-2 hover:bg-gray-700 hover:rounded-md'>
            <Link href='/dashboard/sales'>
              <a
                className={
                  router.pathname === "/dashboard/sales" ? "font-bold" : ""
                }
              >
                Sales
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className='px-4 py-2 hover:bg-gray-700 hover:rounded-md'>
        <Link href='/auth/login'>
          <a className='text-white hover:text-gray-300'>Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
