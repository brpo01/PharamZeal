"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";

import { cn } from "@/lib/utils";
import { Value } from "@radix-ui/react-select";

export function AdminSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const stores = [
    {
      name: "All Stores",
      value: 0,
    },
    {
      name: "Tunstall",
      value: 1,
    },
    {
      name: "Fenton",
      value: 2,
    },
    {
      name: "Hanley",
      value: 3,
    },
    {
      name: "Longton",
      value: 4,
    },
    {
      name: "Stoke",
      value: 5,
    },
  ];

  const routes = [
    {
      href: `/admin`,
      label: "Dashboard",
      active: pathname === `/admin`,
    },
    {
      href: `/admin/sales`,
      label: "Sales",
      active: pathname === `/admin/sales`,
    },
    {
      href: `/admin/customers`,
      label: "Customers",
      active: pathname === `/admin/customers`,
    },
    {
      href: `/admin/stock`,
      label: "Stock",
      active: pathname === `/admin/stock`,
    },
    {
      href: `/admin/drugs`,
      label: "Drugs",
      active: pathname === `/admin/drugs`,
    },
    {
      href: `/admin/employees`,
      label: "Employees",
      active: pathname === `/admin/employees`,
    },
    {
      href: `/admin/contacts`,
      label: "Contacts",
      active: pathname === `/admin/contacts`,
    },
  ];

  return (
    <div className='space-y-9 py-4 px-2'>
      <StoreSwitcher items={stores} />

      <nav className={cn("flex flex-col space-y-3 px-4", className)} {...props}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
