"use client";

import axios from "axios";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import MultiSelectFormField from "@/components/ui/multi-select";

import { Check, ChevronsUpDown, X } from "lucide-react";
import useUserStore from "@/hooks/user-store";

import { cn, calculateAge } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CustomerColumn } from "../../customers/components/columns";
import { DrugColumn } from "../../drugs/components/columns";

export default function SalePage() {
  const { userData } = useUserStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerColumn[]>([]);
  const [customer, setCustomer] = useState<CustomerColumn>();
  const [drugs, setDrugs] = useState<DrugColumn[]>([]);

  const [isMounted, setIsMounted] = useState(false);

  // if (!isMounted) {
  //   return null;
  // }

  useEffect(() => {
    setIsMounted(true);

    getCustomers();
    getDrugs();
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
        setDrugs(res.data.data);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [open, setOpen] = React.useState(false);

  const onCustomerSelect = (customer: CustomerColumn) => {
    const ageAlert = calculateAge(customer.date_of_birth) < 18;

    if (ageAlert) {
      toast.error("Customer is under 18 years old, ask for ID", {
        duration: 8000,
        position: "top-center",
      });
    }
    setCustomer(customer);
    setOpen(false);
  };

  const onCheckout = async () => {
    setLoading(true);

    axios
      .post(
        "http://localhost:8080/sale",
        {
          customerId: customer?.id,
          userId: userData?.id,
          // quantity: totalQuantity,
          // total_price: totalPrice,
          storeId: userData?.store?.id,
          // drugId: selectedDrugsID,
          drugId: [1],
          date_of_sale: Date.now(),
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
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
    <>
      {isMounted && (
        <div className='flex-col w-full'>
          <div className='flex-1 space-y-4 p-8 pt-6 pb-24'>
            <div className='flex items-center justify-between'>
              <Heading title={`New Sale`} description='' />

              <Button onClick={router.back}>
                <ChevronLeft className='mr-2 h-4 w-4' /> Back
              </Button>
            </div>

            <Separator />

            <h2 className='font-semibold'>Check customer details</h2>

            {/* CUSTOMERS */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  size='sm'
                  role='combobox'
                  aria-expanded={open}
                  aria-label='Select a customer'
                  className={cn("w-[200px] justify-between")}
                >
                  {customer?.full_name || "Select customer..."}
                  <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandList>
                    <CommandInput placeholder='Search customer...' />
                    <CommandEmpty>No customer found.</CommandEmpty>
                    <CommandGroup>
                      {customers.map((cust) => (
                        <CommandItem
                          key={cust.id}
                          onSelect={() => onCustomerSelect(cust)}
                          className='text-sm '
                        >
                          {cust.full_name}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              customer?.id === cust.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* CUSTOMERS */}

            {customer ? (
              <Card>
                <CardHeader>
                  <CardTitle>{customer?.full_name}</CardTitle>
                  <CardDescription>
                    Phone: {customer?.mobileNumber}
                  </CardDescription>
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
                            calculateAge(customer?.date_of_birth) < 18
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {calculateAge(customer?.date_of_birth)}
                        </p>
                      </div>

                      <div className='flex flex-col'>
                        <div className='text-sm'>Date of birth</div>
                        <p className='font-semibold'>
                          {customer?.date_of_birth}
                        </p>
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <div className='text-sm'>Address</div>
                      <p className='font-semibold'>{customer?.address}</p>
                    </div>

                    <div className='flex  justify-between gap-4 items-center'>
                      <div className='flex flex-col'>
                        <div className='text-sm'>Allergy</div>
                        <p className='font-semibold text-red-500'>
                          {customer?.allergy}
                        </p>
                      </div>

                      <div className='flex flex-col'>
                        <div className='text-sm'>Medical history</div>
                        <p className='font-semibold'>
                          {customer?.medical_history}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <Separator />
            {/* DRUGS */}

            <h2 className='font-semibold mt-8'>Check drug details</h2>
            <div className='flex items-start gap-4'>
              <div className='flex-1'></div>
              <div className='flex-1'></div>
            </div>

            {/* DRUGS */}
          </div>
        </div>
      )}
    </>
  );
}
