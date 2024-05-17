"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

import useUserStore from "@/hooks/user-store";

export function SiteHeader() {
  const router = useRouter();
  const { userData } = useUserStore();

  const user = {
    name: `${userData?.firstName} ${userData?.lastName}`,
    email: `${userData?.emailAddress}`,
    image: "",
    initials: `${userData?.firstName[0]}${userData?.lastName[0]}`,
    role: userData?.role?.name,
    store: userData?.store.name,
  };

  const logout = () => {
    toast.success("Logged out successfully");
    localStorage.clear();
    router.push("/login");
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        {/* BRAND NAME */}
        <div className='flex items-center space-x-2'>
          <Icons.brand className='h-8 w-8' aria-hidden='true' />
          <span className='font-bold'>PharmaZeal</span>
        </div>
        {/* BRAND NAME */}
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='secondary'
                  className='relative h-8 w-8 rounded-full'
                >
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={user?.image} alt={user.name ?? ""} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                  <div className='flex flex-col space-y-2'>
                    <p className='text-sm font-medium leading-none capitalize'>
                      {user.name}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {user.email}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground capitalize'>
                      {user.role}
                    </p>
                    {user.role != "Admin" ? (
                      ""
                    ) : (
                      <p className='text-xs leading-none text-muted-foreground capitalize'>
                        {user.store}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild disabled>
                    <Link href='/dashboard/account'>
                      <Icons.user className='mr-2 h-4 w-4' aria-hidden='true' />
                      Account
                      <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <div onClick={() => logout()}>
                    <Icons.logout className='mr-2 h-4 w-4' aria-hidden='true' />
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
