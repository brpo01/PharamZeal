"use client";
import axios from "axios";

import { CreditCard, PoundSterling, Package, Users } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatter } from "@/lib/utils";
import { useState, useEffect } from "react";

import { CustomerColumn } from "./(routes)/customers/components/columns";
import { DrugColumn } from "./(routes)/drugs/components/columns";
import { SaleColumn } from "./(routes)/sales/components/columns";

import useStoreSwitcher from "@/hooks/use-store-switcher";
import { PieChartPlot } from "@/components/pie-chart";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const { storeData } = useStoreSwitcher();
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

  const storeArray = ["Tunstall", "Fenton", "Hanley", "Longton", "Stoke"];

  const searchStringsAndSumPrices = () => {
    return storeArray.map((searchString) => {
      // Calculate the total price where the searchString appears
      const total = sales
        .filter((obj) => {
          // Check if the searchString appears in any of the object's values
          return Object.values(obj).some(
            (value) =>
              value.toString().toLowerCase() === searchString.toLowerCase()
          );
        })
        .reduce((accumulator, obj) => accumulator + obj.total_price, 0); // Sum the prices of the found objects

      // Return an object with the name and total
      return {
        name: searchString,
        total: total,
      };
    });
  };

  const data = searchStringsAndSumPrices();

  const filterSalesDataByStore = () => {
    if (storeData?.name === "All Stores") {
      return sales;
    }
    return sales.filter((item) => item.name === storeData?.name);
  };

  const filterCustomersDataByStore = () => {
    if (storeData?.name === "All Stores") {
      return customers;
    }
    return customers.filter((item) => item.store_name === storeData?.name);
  };

  const filterDrugsDataByStore = () => {
    if (storeData?.name === "All Stores") {
      return drugs;
    }
    return drugs.filter((item) => item.store === storeData?.name);
  };

  const totalRevenue = () => {
    return filterSalesDataByStore().reduce((accumulator, currentSale) => {
      return accumulator + currentSale.total_price;
    }, 0);
  };

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-32'>
        <Heading title='Dashboard' description='Overview of your store' />
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
                {filterCustomersDataByStore().length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {filterSalesDataByStore().length}
              </div>
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
              <div className='text-2xl font-bold'>
                {filterDrugsDataByStore().length}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <PieChartPlot />
            <Overview data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
