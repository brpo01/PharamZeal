"use client";

import axios from "axios";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import MultiSelectFormField from "@/components/ui/multi-select";

import { Check, ChevronsUpDown, X } from "lucide-react";
import useUserStore from "@/hooks/user-store";
import useCart from "@/hooks/use-cart";

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
  CardFooter,
} from "@/components/ui/card";

import { CustomerColumn } from "../../customers/components/columns";
import { DrugColumn } from "../../drugs/components/columns";
import { Drug } from "@/types";

export default function SalePage() {
  const { userData } = useUserStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

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
          </div>
        </div>
      )}
    </>
  );
}
