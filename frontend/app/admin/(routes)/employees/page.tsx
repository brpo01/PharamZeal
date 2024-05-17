"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import axios from "axios";

import { EmployeeColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function EmployeesPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<EmployeeColumn[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/users/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const employees = users?.map((user) => {
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddress,
      phone: user.phoneNumber,
      role: user.role.name,
      store: user.store.name,
    };
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
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
        <DataTable searchKey='name' columns={columns} data={employees} />
      </div>
    </div>
  );
}
