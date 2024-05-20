"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";

import { authSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

import Select from "react-select";

type Inputs = z.infer<typeof authSchema>;

const storeOptions = [
  { value: 1, label: "Tunstall" },
  { value: 2, label: "Fenton" },
  { value: 3, label: "Hanley" },
  { value: 4, label: "Longton" },
  { value: 5, label: "Stoke" },
];

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [storeId, setStoreId] = useState(1);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      phoneNumber: "",
      storeId: 1,
      roleId: 2,
      address: "",
    },
  });

  function onSubmit(data: Inputs) {
    let formattedData = {
      ...data,
      storeId: storeId,
    };

    setLoading(true);
    axios
      .post("http://localhost:8080/users/create", formattedData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.statusCode === 200) router.push("/login");
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        toast.error(unknownError);
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Form {...form}>
      <form
        className='grid gap-4'
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className='flex gap-3'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder='john' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder='doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='emailAddress'
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
          name='storeId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select
                options={storeOptions}
                onChange={(e) => {
                  setStoreId(e?.value);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder='+44 (07) 4468 03654' {...field} />
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

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder='Type your address here.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading}>
          {loading && (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
          )}
          Register
        </Button>
      </form>
    </Form>
  );
}
