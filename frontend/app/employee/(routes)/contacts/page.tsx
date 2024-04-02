"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default async function ContactsPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Contacts`}
            description='Manage drugs and medicines for your store'
          />
          <Button onClick={() => router.push(`/medicine/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />
      </div>
    </div>
  );
}
