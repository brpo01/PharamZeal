"use client";
import axios from "axios";

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

import { EmployeeColumn } from "../components/columns";

export default function EmployeePage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState<EmployeeColumn>();

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem("apiToken");

    await axios
      .get(`http://localhost:8080/users/${params.employeeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
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
          <Heading title={`Employee Details`} description='' />

          <Button onClick={router.back}>
            <ChevronLeft className='mr-2 h-4 w-4' /> Back
          </Button>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>
              {employee?.firstName} {employee?.lastName}
            </CardTitle>
            <CardDescription>Phone: {employee?.phoneNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex  justify-between gap-4 items-center'>
                <div className='flex flex-col'>
                  <div className='font-semibold'>Store</div>
                  <p className='text-sm'>{employee?.store.name}</p>
                </div>

                <div className='flex flex-col'>
                  <div className='font-semibold'>Address</div>
                  <p className='text-sm'>{employee?.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
