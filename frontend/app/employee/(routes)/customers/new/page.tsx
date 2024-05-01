"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default async function CustomerPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading title={`Add New Customer`} description='' />
          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />
      </div>
    </div>
  );
}
