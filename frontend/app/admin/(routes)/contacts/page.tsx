"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ContactColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default async function SalesPage() {
  const params = useParams();
  const router = useRouter();

  const contacts: ContactColumn[] = [
    {
      store: "Tunstall",
      phone: "+44 07-333-433-335",
    },
    {
      store: "Fenton",
      phone: "+44 07-333-433-336",
    },
    {
      store: "Hanley",
      phone: "+44 07-333-433-337",
    },
    {
      store: "Longton",
      phone: "+44 07-333-433-338",
    },
    {
      store: "Stoke",
      phone: "+44 07-333-433-339",
    },
  ];

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <div className='flex items-center justify-between'>
          <Heading title={`Contacts`} description='' />
          <Button onClick={() => router.push(`/medicine/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable searchKey='store' columns={columns} data={contacts} />
      </div>
    </div>
  );
}
