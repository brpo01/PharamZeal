"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function EmployeeSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

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
