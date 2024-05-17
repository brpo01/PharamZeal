"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import useStoreSwitcher from "@/hooks/use-store-switcher";

import axios from "axios";
import { calculateAge } from "@/lib/utils";

import { CustomerColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function CustomersPage() {
  const params = useParams();
  const router = useRouter();
  const { storeData } = useStoreSwitcher();
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
        console.log(res.data.data);
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

  const filterDataByStore = () => {
    if (storeData?.name === "All Stores") {
      return customers;
    }
    return customers.filter((item) => item.store_name === storeData?.name);
  };

  const formattedCustomers = filterDataByStore().map((item) => ({
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
    age: calculateAge(item.date_of_birth),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Customers`}
            description='Manage customers for your store'
          />
          <Button onClick={() => router.push(`/admin/customers/new`)}>
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
