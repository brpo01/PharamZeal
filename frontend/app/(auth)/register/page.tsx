import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";

export default async function SignUpPage() {
  return (
    <div className='py-16'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Register</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <div className='text-sm text-muted-foreground'>
            Already have an account?{" "}
            <Link
              aria-label='Login'
              href='/login'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
