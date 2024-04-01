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
      href: `/employee`,
      label: "Dashboard",
      active: pathname === `/employee`,
    },
    {
      href: `/employee/sales`,
      label: "Sales",
      active: pathname === `/employee/sales`,
    },
    {
      href: `/employee/customers`,
      label: "Customers",
      active: pathname === `/employee/customers`,
    },
    {
      href: `/employee/stock`,
      label: "Stock",
      active: pathname === `/employee/stock`,
    },
    {
      href: `/employee/drugs`,
      label: "Drugs",
      active: pathname === `/employee/drugs`,
    },
    {
      href: `/employee/contacts`,
      label: "Contacts",
      active: pathname === `/employee/contacts`,
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
