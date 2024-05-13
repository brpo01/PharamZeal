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
import { calculateAge } from "@/lib/utils";

import { CustomerColumn } from "../components/columns";

export default function CustomerPage() {
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
                  <div className='text-sm'>Gender</div>
                  <p className='font-semibold'>{customer?.gender}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='text-sm'>Age</div>
                  <p
                    className={`font-semibold ${
                      calculateAge(customer?.date_of_birth || "") < 18
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {calculateAge(customer?.date_of_birth || "")}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <div className='text-sm'>Date of birth</div>
                  <p className='font-semibold'>{customer?.date_of_birth}</p>
                </div>
              </div>

              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='text-sm'>Store</div>
                  <p className='font-semibold'>{customer?.store_name}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='text-sm'>Post code</div>
                  <p className='font-semibold'>{customer?.postcode}</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='text-sm'>Address</div>
                <p className='font-semibold'>{customer?.address}</p>
              </div>

              <div className='flex flex-col'>
                <div className='text-sm'>Allergy</div>
                <p className='font-semibold'>{customer?.allergy}</p>
              </div>

              <div className='flex flex-col'>
                <div className='text-sm'>Medical history</div>
                <p className='font-semibold'>{customer?.medical_history}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
