"use client";

import { useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CreditCard, PoundSterling, Package } from "lucide-react";
import useUserStore from "@/hooks/user-store";

import { Overview } from "@/components/overview";

import { formatter } from "@/lib/utils";

export default function Employee() {
  const { userData } = useUserStore();
  const router = useRouter();

  const data = [
    {
      name: "Jan",
      total: 300,
    },
    {
      name: "Feb",
      total: 350,
    },
    {
      name: "Mar",
      total: 300,
    },
    {
      name: "Apr",
      total: 300,
    },
    {
      name: "May",
      total: 100,
    },
    {
      name: "Jun",
      total: 200,
    },
    {
      name: "Jul",
      total: 600,
    },
    {
      name: "Aug",
      total: 400,
    },
    {
      name: "Sep",
      total: 300,
    },
    {
      name: "Oct",
      total: 200,
    },
    {
      name: "Nov",
      total: 100,
    },
    {
      name: "Dec",
      total: 500,
    },
  ];

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-24'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Welcome to ${
              userData ? userData?.store?.name : "the"
            } store`}
            description=''
          />
        </div>

        <Separator />

        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <PoundSterling className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{formatter.format(1000)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+{30}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Products In Stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{12}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
