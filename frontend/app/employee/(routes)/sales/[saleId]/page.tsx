"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { formatter } from "@/lib/utils";

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
          <Heading title={`Sale Details`} description='' />

          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>
              <div className='font-semibold'>Customer</div>
              <p>{sale?.full_name}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='font-semibold'>Store</div>
                  <p className='text-sm'>{sale?.name}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Cashier</div>
                  <p className='text-sm'>{sale?.firstname}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Date of sale</div>
                  <p className='text-sm'>{sale?.date_of_sale}</p>
                </div>
              </div>

              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='font-semibold'>Drug</div>
                  <p className='text-sm'>{sale?.drugName}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Quantity</div>
                  <p className='text-sm'>{sale?.quantity}</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='font-semibold'>Total price</div>
                <p className='text-sm'>{formatter.format(sale?.total_price)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
