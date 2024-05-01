import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default async function ResetPasswordPage() {
  return (
    <div>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Reset Password</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <ResetPasswordForm />
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 hidden sm:inline-block'>
              A mail will be sent to you with the link to reset your password.
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
