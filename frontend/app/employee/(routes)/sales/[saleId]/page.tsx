"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { formatter, formatDate } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";

import { SaleColumn } from "../components/columns";

export default function SalePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sale, setSale] = useState<SaleColumn>();

  useEffect(() => {
    getSale();
  }, []);

  const getSale = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get(`http://localhost:8080/sale/${params.saleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setSale(res.data.data);
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
      <div className='flex-1 space-y-4 p-8 pt-6 pb-24'>
        <div className='flex items-center justify-between'>
          <Heading title={`Sale Invoice`} description='' />

          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <h1>Invoice: #{sale?.id}</h1>

              <h1>Date of sale: {formatDate(sale?.date_of_sale)}</h1>
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='text-sm'>Store</div>
                  <p className='text-sm font-semibold'>{sale?.name}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Cashier</div>
                  <p className='text-sm'>{sale?.firstname}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
