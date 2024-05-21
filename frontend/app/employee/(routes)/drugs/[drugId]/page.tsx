"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { formatter } from "@/lib/utils";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";

import { DrugColumn } from "../components/columns";

export default function DrugPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [drug, setDrug] = useState<DrugColumn>();

  useEffect(() => {
    getDrug();
  }, []);

  const getDrug = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get(`http://localhost:8080/drug/${params.drugId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setDrug(res.data.data);
        if (res.data.data.available_stock < 30) {
          toast.error("This drug as a low stock", {
            duration: 8000,
            position: "top-center",
          });
        }
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
          <Heading title={`Drug Details`} description='' />

          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>{drug?.drugName}</CardTitle>
            <CardDescription>Drug code: {drug?.drug_code}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='text-sm'>Price</div>
                  <p className='font-semibold'>
                    {formatter.format(drug?.price)}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <div className='text-sm'>Expiry date</div>
                  <p className='font-semibold'>{drug?.expiry_date}</p>
                </div>
              </div>

              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='text-sm'>Check ID</div>
                  <p className='font-semibold'>
                    {drug?.idCheck ? "Yes" : "No"}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <div className='text-sm'>Available Stock</div>
                  <p className='font-semibold'>{drug?.available_stock}</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='text-sm'>Condition</div>
                <p className='font-semibold'>{drug?.customer_condition}</p>
              </div>

              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='text-sm'>Store</div>
                  <p className='font-semibold'>{drug?.store}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='text-sm'>Post code</div>
                  <p className='font-semibold'>{drug?.postcode}</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='text-sm'>Expiry date</div>
                <p className='font-semibold'>{drug?.expiry_date}</p>
              </div>

              <div className='flex flex-col'>
                <div className='text-sm'>Available</div>
                <p className='font-semibold'>
                  {drug?.availability ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
