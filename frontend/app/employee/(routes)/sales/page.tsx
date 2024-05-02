"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { formatter } from "@/lib/utils";

import { SaleColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function SalesPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState<SaleColumn[]>([]);

  const formattedSales: SaleColumn[] = sales.map((item) => ({
    id: item.id,
    date_of_sale: item.date_of_sale,
    quantity: item.quantity,
    drugName: item.drugName,
    firstname: item.firstname,
    full_name: item.full_name,
    name: item.name,
    drug: item.drug,
    total_price: formatter.format(item.total_price),
  }));

  useEffect(() => {
    getSales();
  }, []);

  const getSales = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/sale", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setSales(res.data.data);
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
          <Heading title={`Sales`} description='' />
          <Button onClick={() => router.push(`/employee/sales/new`)}>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </div>

        <Separator />

        <DataTable
          searchKey='full_name'
          columns={columns}
          data={formattedSales}
        />
      </div>
    </div>
  );
}
