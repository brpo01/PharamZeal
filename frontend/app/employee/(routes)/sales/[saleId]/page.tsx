"use client";
import { useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatter, formatDate } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";

import { SaleColumn } from "../components/columns";

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
  tax?: number;
  name?: string;
  amount?: number;
};

export default function SalePage() {
  const [sale, setSale] = useState<SaleColumn>();

  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSale();
  }, [setSale]);

  const getSale = () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    axios
      .get(`http://localhost:8080/sale/${params.saleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // setSale(res.data.data.sale);
        const result = res.data.data.sale;
        console.log(result);
        setSale(result);
        console.log(res.data.data.sale);
        console.log(sale);
      })
      .catch((error: any) => {
        const unknownError = "Something went wrong, please try again.";
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formattedDrugs: DrugColumn[] = sale?.drugs.map((item: any) => ({
    id: item.id,
    name: item.drugName,
    quantity: item.quantity || 1,
    amount: formatter.format(item.price * (item.quantity | 1)),
    price: formatter.format(item.price),
    total: formatter.format(item.total),
    tax: formatter.format(item.tax || 0),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6 pb-24'>
        <div className='flex items-center justify-between'>
          <Heading title={`Sale Invoice`} description='' />

          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <div className='flex justify-between items-center text-sm'>
              <h1>Invoice: #{sale?.id}</h1>

              <h1>Date of sale: {formatDate(sale?.date_of_sale)}</h1>
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='text-sm font-semibold'>Store</div>
                  <p className='text-sm capitalize'>{sale?.name}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Cashier</div>
                  <p className='text-sm capitalize'>{sale?.firstname}</p>
                </div>
              </div>

              <div>
                <p className='text-sm font-semibold'>SOLD TO:</p>
                <div className='flex  justify-between gap-4 items-start'>
                  <p className='text-sm flex-1'>{sale?.full_name}</p>

                  <p className='text-sm flex-1'>{sale?.mobileNumber}</p>

                  <p className='text-sm flex-1'>{sale?.address}</p>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              {formattedDrugs && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Drug Name</TableHead>
                      <TableHead className='w-[160px]'>Rate</TableHead>
                      <TableHead className='w-[160px]'>Quantity</TableHead>
                      <TableHead className='text-right w-[160px]'>
                        Tax
                      </TableHead>
                      <TableHead className='text-right w-[160px]'>
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formattedDrugs.map((drug) => (
                      <TableRow key={drug.id}>
                        <TableCell className='font-medium'>
                          {drug.name}
                        </TableCell>
                        <TableCell>{drug.price}</TableCell>
                        <TableCell>{drug.quantity}</TableCell>
                        <TableCell className='text-right'>{drug.tax}</TableCell>
                        <TableCell className='text-right'>
                          {drug.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className='text-right'>
                        {formatter.format(0)}
                      </TableCell>
                      <TableCell className='text-right'>$238</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              )}
            </div>
          </CardContent>

          <CardFooter className='flex justify-end'>
            <Button>Download Invoice</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
