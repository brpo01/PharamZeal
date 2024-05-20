"use client";
import axios from "axios";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CreditCard, PoundSterling, Package, Users } from "lucide-react";
import useUserStore from "@/hooks/user-store";
import { useState, useEffect } from "react";
import { CustomerColumn } from "./(routes)/customers/components/columns";
import { DrugColumn } from "./(routes)/drugs/components/columns";
import { SaleColumn } from "./(routes)/sales/components/columns";

import { Overview } from "@/components/overview";

import { formatter } from "@/lib/utils";

export default function Employee() {
  const { userData } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerColumn[]>([]);
  const [drugs, setDrugs] = useState<DrugColumn[]>([]);
  const [sales, setSales] = useState<SaleColumn[]>([]);

  useEffect(() => {
    getCustomers();
    getDrugs();
    getSales();
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

  const getSales = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get("http://localhost:8080/sale", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setSales(res.data.data);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredCustomers = customers.filter((customer) => {
    return customer.store_name === userData?.store?.name;
  });

  const filteredDrugs = drugs.filter((drug) => {
    return drug.store === userData?.store?.name;
  });
  const filteredSales = sales.filter((sale) => {
    return sale.name === userData?.store?.name;
  });

  const totalRevenue = () => {
    return filteredSales.reduce((accumulator, currentSale) => {
      return accumulator + currentSale.total_price;
    }, 0);
  };

  const data = [
    {
      name: "Jan",
      total: 300,
    },
    {
      name: "Feb",
      total: 350,
    },
    {
      name: "Mar",
      total: 300,
    },
    {
      name: "Apr",
      total: 300,
    },
    {
      name: "May",
      total: 100,
    },
    {
      name: "Jun",
      total: 200,
    },
    {
      name: "Jul",
      total: 600,
    },
    {
      name: "Aug",
      total: 400,
    },
    {
      name: "Sep",
      total: 300,
    },
    {
      name: "Oct",
      total: 200,
    },
    {
      name: "Nov",
      total: 100,
    },
    {
      name: "Dec",
      total: 500,
    },
  ];

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <div className='flex items-center justify-between'>
          <Heading
            title={`Welcome to ${
              userData ? userData?.store?.name : "the"
            } store`}
            description=''
          />
        </div>

        <Separator />

        <div className='grid gap-4 grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <PoundSterling className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatter.format(totalRevenue())}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Customers</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {filteredCustomers.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{filteredSales.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Products In Stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{filteredDrugs.length}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
