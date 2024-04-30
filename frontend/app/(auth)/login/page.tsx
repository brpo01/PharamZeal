import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  return (
    <div>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Login</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <LoginForm />
        </CardContent>
        <CardFooter className='flex flex-wrap items-center gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 hidden sm:inline-block'>
              Don&apos;t have an account?
            </span>
          </div>
          <Link
            aria-label='Register'
            href='/register'
            className='text-primary underline-offset-4 transition-colors hover:underline'
          >
            Register
          </Link>
        </CardFooter>
      </Card>

      <Link
        aria-label='admin'
        href='/admin'
        className='text-primary underline-offset-4 transition-colors hover:underline'
      >
        Admin
      </Link>

      <Link
        aria-label='employee'
        href='/employee'
        className='text-primary underline-offset-4 transition-colors hover:underline'
      >
        Staff
      </Link>
    </div>
  );
}
