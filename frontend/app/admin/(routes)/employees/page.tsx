"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { EmployeesColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default async function EmployeesPage() {
  const params = useParams();
  const router = useRouter();

  const employees: EmployeesColumn[] = [
    {
      store: "Tunstall",
      id: "rtii4o4o5o5o5",
      name: "Praise Bola",
      role: "staff",
    },
    {
      store: "Fenton",
      id: "rtii4o4o5o5o544",
      name: "Gourav",
      role: "staff",
    },
    {
      store: "Hanley",
      id: "rtii4o4o5o5o53s",
      name: "Md Sayyed",
      role: "staff",
    },
    {
      store: "Longton",
      id: "rtii4o4o5455o5",
      name: "Praise gourav",
      role: "staff",
    },
    {
      store: "Stoke",
      id: "rtii4o4o=905o5o5",
      name: "Bola Praise",
      role: "staff",
    },
  ];

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Employees`}
            description='Manage employees details for your stores'
          />
          <Button onClick={() => router.push(`/medicine/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />
        <DataTable searchKey='store' columns={columns} data={employees} />
      </div>
    </div>
  );
}
