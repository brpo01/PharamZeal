"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import useUserStore from "@/hooks/user-store";

import axios from "axios";

import { CustomerColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function CustomersPage() {
  const params = useParams();
  const router = useRouter();
  const { userData } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerColumn[]>([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/customer", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCustomers(res.data.data);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredCustomers = customers.filter((customer) => {
    return customer.store_name === userData?.store?.name;
  });

  const formattedCustomers = filteredCustomers.map((item) => ({
    address: item.address,
    allergy: item.allergy,
    date_of_birth: item.date_of_birth,
    firstname: item.firstname,
    full_name: item.full_name,
    gender: item.gender,
    id: item.id,
    lastname: item.lastname,
    medical_history: item.medical_history,
    mobileNumber: item.mobileNumber,
    postcode: item.postcode,
    sales: item.sales,
    store_name: item.store_name,
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-24'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Customers`}
            description='Manage customers for your store'
          />
          <Button onClick={() => router.push(`/employee/customers/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable
          searchKey='full_name'
          columns={columns}
          data={formattedCustomers}
        />
      </div>
    </div>
  );
}
