"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { formatter } from "@/lib/utils";

import { StockColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function SalesPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const stocks = [
    {
      id: "tututiti",
      name: "paracetamol",
      quantity: 2,
      price: 5,
      expiry_date: "12/06/2024",
    },
    {
      id: "tututitierr",
      name: "paracetamol 3",
      quantity: 1,
      price: 5,
      expiry_date: "12/06/2024",
    },
    {
      id: "tututiti45",
      name: "panadol 1",
      quantity: 5,
      price: 56,
      expiry_date: "12/07/2024",
    },
  ];

  const formattedStocks: StockColumn[] = stocks.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    expiry_date: item.expiry_date,
    price: formatter.format(item.price),
  }));

  useEffect(() => {
    getDrugs();
  }, []);

  const getDrugs = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/drug", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading title={`Drug`} description='' />
          <Button onClick={() => router.push(`/employee/drugs/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable searchKey='name' columns={columns} data={formattedStocks} />
      </div>
    </div>
  );
}
