"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { z } from "zod";

import { authLogin } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

type Inputs = z.infer<typeof authLogin>;

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: Inputs) {}

  // function onSubmit(data: Inputs) {
  //   setLoading(true);

  //   signIn("credentials", {
  //     ...data,
  //     redirect: false,
  //   })
  //     .then((callback) => {
  //       if (callback?.ok) {
  //         toast.success("Logged In");
  //         router.refresh();
  //         router.push("/");
  //       }

  //       if (callback?.error) {
  //         toast.error(callback.error);
  //         throw new Error("Wrong Credentials");
  //       }
  //     })
  //     .catch((err) => {
  //       const unknownError = "Something went wrong, please try again.";
  //       toast.error(unknownError);
  //       throw new Error(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  return (
    <Form {...form}>
      <form
        className='grid gap-4'
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading}>
          {loading && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          )}
          Login
          <span className='sr-only'>Login</span>
        </Button>
      </form>
    </Form>
  );
}
