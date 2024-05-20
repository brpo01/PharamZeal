"use client";

import axios from "axios";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import Select from "react-select";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import useUserStore from "@/hooks/user-store";

import { cn, calculateAge, formatter } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { MouseEventHandler } from "react";
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
import { Drug } from "@/types";

export type DrugColumn = {
  id: string;
  price: number;
  availability: boolean;
  available_stock: number;
  customer_condition: string;
  drugName: string;
  drug_code: string;
  expiry_date: string;
  id_check: boolean;
  idCheck?: boolean;
  postcode: string;
  sales: any;
  store: string;
  quantity?: number;
};

export default function SalePage() {
  const { userData } = useUserStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerColumn[]>([]);
  const [customer, setCustomer] = useState<CustomerColumn>();
  const [drugs, setDrugs] = useState<DrugColumn[]>([]);
  const [storeDrugs, setStoreDrugs] = useState<DrugColumn[]>([]);
  const [selectedDrugs, setSelectedDrugs] = useState<DrugColumn[]>([]);

  const [isMounted, setIsMounted] = useState(false);

  let cart: DrugColumn[] = [];

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
        let store = res.data.data.filter(
          (drug: DrugColumn) => drug.store === userData?.store.name
        );
        setStoreDrugs(store);
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

  const onAddToCart = (drug: DrugColumn) => {
    const index = cart.indexOf(drug);
    if (index !== -1) {
      cart.splice(index, 1); // Remove item if it exists
    } else {
      cart.push(drug); // Otherwise, push it into the array
    }
  };

  const formatDate = () => {
    const now = new Date(Date.now());

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11, so we add 1
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const onCheckout = async () => {
    const getDrugIds = () => {
      return selectedDrugs.map((drug) => drug.id);
    };

    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .post(
        "http://localhost:8080/sale",
        {
          customerId: customer?.id,
          userId: userData?.id,
          quantity: totalQuantity(),
          total_price: totalPrice(),
          storeId: userData?.store?.id,
          drugId: getDrugIds(),
          date_of_sale: formatDate(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success(res.data.message, {
            duration: 3000,
            position: "top-center",
          });
        }
        if (res.data.statusCode === 200) router.push("/admin/sales");
      })
      .catch((error: any) => {
        if (error.response.data.statusCode === 400) {
          toast.error(error.response.data.message, {
            duration: 3000,
            position: "top-center",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formattedDrugs = storeDrugs.map((drug) => ({
    value: drug.id,
    label: drug.drugName,
    id: drug.id,
    drug_code: drug.drug_code,
    drugName: drug.drugName,
    customer_condition: drug.customer_condition,
    id_check: drug.id_check,
    store: drug.store,
    postcode: drug.postcode,
    available_stock: drug.available_stock,
    price: drug.price,
    expiry_date: drug.expiry_date,
    availability: drug.availability,
  }));

  const totalQuantity = () => {
    let totalQuantity = 0;

    selectedDrugs.forEach((drug) => {
      if (drug.quantity != null) {
        totalQuantity += drug.quantity;
      }
    });

    // If any drug does not have a quantity property, use the array length
    const itemsWithoutQuantity = selectedDrugs.filter(
      (drug) => drug.quantity == null
    ).length;
    totalQuantity += itemsWithoutQuantity;

    return totalQuantity;
  };

  const totalPrice = () => {
    let totalPrice = 0;

    cart.forEach((drug) => {
      if (drug.price != null) {
        totalPrice += drug.price;
      }
    });

    return totalPrice;
  };

  const onDrugSelect = (drug: DrugColumn[]) => {
    setSelectedDrugs(drug);
  };

  function findAvailableDrugs(drugArray: any, drugName: string) {
    // Filter drugs with the same drugName where availability is true
    const availableDrugs = drugArray.filter(
      (drug: DrugColumn) => drug.drugName === drugName && drug.availability
    );

    // If no available drugs with the provided name are found,
    // return drugs with the same name where availability is true
    if (availableDrugs.length === 0) {
      return drugArray.filter(
        (drug: DrugColumn) => drug.drugName === drugName && drug.availability
      );
    }

    return availableDrugs;
  }

  return (
    <>
      {isMounted && (
        <div className='flex-col w-full'>
          <div className='flex-1 space-y-4 p-8 pt-6 pb-36'>
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
              <div className='flex-1'>
                <Select
                  isMulti
                  options={formattedDrugs}
                  onChange={(e) => {
                    onDrugSelect(e);
                  }}
                />

                {selectedDrugs && (
                  <div className='border mt-8 p-4 rounded-md flex flex-col gap-4'>
                    {selectedDrugs
                      ? selectedDrugs.map((drug, index) => (
                          <div
                            key={index}
                            className='flex flex-col items-start gap-4 border p-4 rounded-md'
                          >
                            <div className='flex justify-between gap-4'>
                              <div className='flex justify-between gap-4 flex-wrap'>
                                <div className='flex flex-col gap-1'>
                                  <div className='text-sm'>Name</div>
                                  <p className='font-semibold'>
                                    {drug.drugName}
                                  </p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='text-sm'>Check ID</div>
                                  <p
                                    className={`font-semibold ${
                                      drug.id_check ? "text-red-500" : ""
                                    }`}
                                  >
                                    {drug.id_check ? "Yes" : "No"}
                                  </p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='text-sm'>Available</div>
                                  <p
                                    className={`font-semibold ${
                                      drug.availability ? "" : "text-red-500"
                                    }`}
                                  >
                                    {drug.availability ? "Yes" : "No"}
                                  </p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='text-sm'>Expiry date</div>
                                  <p className='font-semibold'>
                                    {drug.expiry_date}
                                  </p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                  <div className='text-sm'>Condition</div>
                                  <p className='font-semibold'>
                                    {drug.customer_condition}
                                  </p>
                                </div>
                              </div>
                              <div>
                                {!drug.availability ? (
                                  ""
                                ) : (
                                  <div onClick={onAddToCart(drug)}></div>
                                )}
                              </div>
                            </div>

                            <>
                              {drug.availability ? (
                                ""
                              ) : (
                                <div>
                                  <p className='text-sm'>Available at:</p>

                                  <div className='flex gap-4 item-center'>
                                    {findAvailableDrugs(
                                      drugs,
                                      drug.drugName
                                    ).map((drug: DrugColumn) => (
                                      <p className='text-sm font-semibold text-red-500'>
                                        {drug.store}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          </div>
                        ))
                      : null}
                  </div>
                )}
              </div>
              <div className='flex-1'>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <h1>Cart</h1>

                      <p className='text-xs text-red-500 mt-2'>
                        Note: A customer can't buy more than 10 quantity of a
                        particular drug.
                      </p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      {cart.length === 0 && (
                        <p className='text-neutral-500'>
                          No items added to cart
                        </p>
                      )}

                      <div>
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className='flex py-6 border-b w-full'
                          >
                            <div className='flex items-start justify-between w-full'>
                              <div className='flex items-center gap-4 justify-between w-full'>
                                <p className='text-lg font-semibold text-black'>
                                  {item.drugName}
                                </p>
                                <p>{formatter.format(item.price)}</p>
                                <Input
                                  type='number'
                                  placeholder='1'
                                  className='w-16'
                                  max='10'
                                />
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

                          <div className='font-semibold'>
                            {formatter.format(totalPrice())}
                          </div>
                        </div>
                      </div>
                      <Button
                        disabled={cart.length === 0 || loading}
                        onClick={onCheckout}
                        className='w-full mt-6'
                      >
                        {loading && (
                          <Loader2
                            className='mr-2 h-4 w-4 animate-spin'
                            aria-hidden='true'
                          />
                        )}
                        Checkout
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* DRUGS */}
          </div>
        </div>
      )}
    </>
  );
}
