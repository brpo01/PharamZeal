"use client";

import axios from "axios";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import MultiSelectFormField from "@/components/ui/multi-select";

import { Check, ChevronsUpDown, X } from "lucide-react";
import useUserStore from "@/hooks/user-store";
import useCart from "@/hooks/use-cart";

import { cn } from "@/lib/utils";
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
  const cart = useCart();
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerColumn[]>([]);
  const [customer, setCustomer] = useState<CustomerColumn>();
  const [drugs, setDrugs] = useState<DrugColumn[]>([]);
  const [filteredSelectedDrugs, setFilteredSelectedDrug] =
    useState<DrugColumn[]>();

  const [isMounted, setIsMounted] = useState(false);

  let selectedDrugsID: string[] = [];
  // let filteredSelectedDrugs: DrugColumn[] = [];

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

  function onDrugSelect(drug: string[]) {
    setFilteredSelectedDrug([]);
    selectedDrugsID = drug;
    console.log(selectedDrugsID);
    const selected = drugs.filter((item) => selectedDrugsID?.includes(item.id));
    console.log(selected);
    setFilteredSelectedDrug(selected); //
    // filteredSelectedDrugs = selected;
  }

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const onCustomerSelect = (customer: CustomerColumn) => {
    setCustomer(customer);
    setOpen(false);
  };

  const onRemove = (data: Drug) => {
    cart.removeItem(data.id);
  };

  const onAddToCart = (data: Drug) => {
    cart.addItem(data);
  };

  const onCheckout = async () => {
    setLoading(true);

    axios
      .post(
        "http://localhost:8080/sale",
        {
          customerId: customer?.id,
          userId: userData?.id,
          quantity: totalQuantity,
          total_price: totalPrice,
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

  const totalQuantity = cart.items.reduce((total, item) => {
    return total + (item?.quantity || 1);
  }, 0);

  const totalPrice = cart.items.reduce((total, item) => {
    return (
      total +
      Number(item.price * (item?.quantity || 1)) +
      (item.tax ? item.tax : 0)
    );
  }, 0);

  const filteredDrugs = drugs.filter((drug) => {
    return drug.store === userData?.store?.name;
  });

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
                        <div className='font-semibold'>Gender</div>
                        <p className='text-sm'>{customer?.gender}</p>
                      </div>

                      <div className='flex flex-col'>
                        <div className='font-semibold'>Date of birth</div>
                        <p className='text-sm'>{customer?.date_of_birth}</p>
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <div className='font-semibold'>Address</div>
                      <p className='text-sm'>{customer?.address}</p>
                    </div>

                    <div className='flex  justify-between gap-4 items-center'>
                      <div className='flex flex-col'>
                        <div className='font-semibold'>Allergy</div>
                        <p className='text-sm'>{customer?.allergy}</p>
                      </div>

                      <div className='flex flex-col'>
                        <div className='font-semibold'>Medical history</div>
                        <p className='text-sm'>{customer?.medical_history}</p>
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
              <div className='flex-1'>
                <MultiSelectFormField
                  options={filteredDrugs}
                  defaultValue={[]}
                  onValueChange={(value) => onDrugSelect(value)}
                  placeholder='Select options'
                  variant='inverted'
                />

                <>
                  {filteredSelectedDrugs && (
                    <div className='border mt-8 p-4 rounded-md'>
                      {filteredSelectedDrugs
                        ? filteredSelectedDrugs.map((drug, index) => (
                            <div
                              key={index}
                              className='flex justify-between items-start gap-4 border p-4 rounded-md'
                            >
                              <div className='flex justify-between gap-4 flex-wrap'>
                                <div className='flex flex-col gap-1'>
                                  <div className='font-semibold'>Name</div>
                                  <p>{drug.drugName}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='font-semibold'>Check ID</div>
                                  <p>{drug.id_check ? "Yes" : "No"}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='font-semibold'>Condition</div>
                                  <p>{drug.customer_condition}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='font-semibold'>Available</div>
                                  <p>{drug.availability ? "Yes" : "No"}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='font-semibold'>
                                    Expiry date
                                  </div>
                                  <p>{drug.expiry_date}</p>
                                </div>
                              </div>
                              {/* <Button onClick={onAddToCart(drug)}>Add</Button> */}
                            </div>
                          ))
                        : null}
                    </div>
                  )}
                </>
              </div>
              <div className='flex-1'>
                {cart && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <h1>Cart</h1>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        {cart.items.length === 0 && (
                          <p className='text-neutral-500'>
                            No items added to cart
                          </p>
                        )}

                        <div>
                          {cart.items.map((item) => (
                            <div className='flex py-6 border-b w-full'>
                              <div className='flex items-start justify-between'>
                                <div className='flex items-center gap-4'>
                                  <p className='text-lg font-semibold text-black'>
                                    {item.drugName}
                                  </p>
                                  <p>{item.price}</p>
                                  <Input
                                    type='number'
                                    placeholder='1'
                                    className='w-8'
                                  />
                                </div>

                                <div onClick={onRemove(item)}>
                                  <X size={15} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className='mt-15 bg-gray-50 px-4 py-6 w-full'>
                        <h2 className='text-lg font-medium text-gray-900'>
                          Order Summary
                        </h2>
                        <div className='mt-6 space-y-4'>
                          <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                            <p className='text-base font-medium text-gray-900'>
                              Order total
                            </p>

                            <div className='font-semibold'>{totalPrice}</div>
                          </div>
                        </div>
                        <Button
                          disabled={cart.items.length === 0}
                          onClick={onCheckout}
                          className='w-full mt-6'
                        >
                          Checkout
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>

            {/* DRUGS */}
          </div>
        </div>
      )}
    </>
  );
}
