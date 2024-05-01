"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";

import { CustomerColumn } from "../components/columns";

export default function CustomersPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<CustomerColumn>();

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get(`http://localhost:8080/customer/${params.customerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setCustomer(res.data.data);
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
          <Heading title={`Customer Details`} description='' />

          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>{customer?.full_name}</CardTitle>
            <CardDescription>Phone: {customer?.mobileNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='font-semibold'>Gender</div>
                  <p className='text-sm'>{customer?.gender}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Date of birth</div>
                  <p className='text-sm'>{customer?.date_of_birth}</p>
                </div>
              </div>

              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='font-semibold'>Store</div>
                  <p className='text-sm'>{customer?.store_name}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Post code</div>
                  <p className='text-sm'>{customer?.postcode}</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='font-semibold'>Address</div>
                <p className='text-sm'>{customer?.address}</p>
              </div>

              <div className='flex flex-col'>
                <div className='font-semibold'>Allergy</div>
                <p className='text-sm'>{customer?.allergy}</p>
              </div>

              <div className='flex flex-col'>
                <div className='font-semibold'>Medical history</div>
                <p className='text-sm'>{customer?.medical_history}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
