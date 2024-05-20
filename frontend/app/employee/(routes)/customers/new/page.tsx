"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";

import { useState } from "react";

import { customerSchema } from "@/lib/validations";
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

type Inputs = z.infer<typeof customerSchema>;

export default function CustomerPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      fullname: "",
      emailAddress: "",
      mobileNumber: "",
      storeId: 1,
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
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <div className='flex items-center justify-between'>
          <Heading title={`Add New Customer`} description='' />
          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />

        <Form {...form}>
          <form
            className='grid gap-4'
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <div className='flex gap-3'>
              <FormField
                control={form.control}
                name='firstname'
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
                name='lastname'
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
              name='mobileNumber'
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
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Type your address here.'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading}>
              {loading && (
                <Loader2
                  className='mr-2 h-4 w-4 animate-spin'
                  aria-hidden='true'
                />
              )}
              Register customer
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
