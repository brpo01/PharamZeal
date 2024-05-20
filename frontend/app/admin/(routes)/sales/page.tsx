"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { formatter } from "@/lib/utils";
import useStoreSwitcher from "@/hooks/use-store-switcher";

import { SaleColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function SalesPage() {
  const params = useParams();
  const router = useRouter();
  const { storeData } = useStoreSwitcher();
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState<SaleColumn[]>([]);

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

  const filterDataByStore = () => {
    if (storeData?.name === "All Stores") {
      return sales;
    }
    return sales.filter((item) => item.name === storeData?.name);
  };

  const formattedSales: SaleColumn[] = filterDataByStore().map((item) => ({
    id: item.id,
    date_of_sale: item.date_of_sale,
    quantity: item.quantity,
    drugName: item.drugName,
    firstname: item.firstname,
    full_name: item.full_name,
    name: item.name,
    drug: item.drug,
    store: item.name,
    total_price: formatter.format(item.total_price),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <div className='flex items-center justify-between'>
          <Heading title={`Sales`} description='' />
          <Button onClick={() => router.push(`/admin/sales/new`)}>
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
