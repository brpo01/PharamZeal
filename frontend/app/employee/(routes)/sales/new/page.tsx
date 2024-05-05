"use client";
import axios from "axios";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { CustomerColumn } from "../../customers/components/columns";
import { DrugColumn } from "../../drugs/components/columns";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function SalePage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerColumn[]>([]);
  const [customer, setCustomer] = useState<CustomerColumn>();
  const [drugs, setDrugs] = useState<DrugColumn[]>([]);

  useEffect(() => {
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
        console.log(res.data.data);
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
        console.log(res.data.data);
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
  const [value, setValue] = React.useState("");

  const onCustomerSelect = (customer: CustomerColumn) => {
    setCustomer(customer);
    setOpen(false);
  };

  return (
    <div className='flex-col w-full'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between'>
          <Heading title={`New Sale`} description='' />
        </div>

        <Separator />

        <h3>Check customer details</h3>

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
                          customer?.id === cust.id ? "opacity-100" : "opacity-0"
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

        {/* DRUGS */}
        {/* <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'
            >
              {value
                ? frameworks.find((framework) => framework.value === value)
                    ?.label
                : "Select framework..."}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput placeholder='Search framework...' />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover> */}
        {/* DRUGS */}
      </div>
    </div>
  );
}
