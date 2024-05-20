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
        setEmployee(res.data.data.user);
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

        {employee ? (
          <Card>
            <CardHeader>
              <CardTitle className='capitalize'>
                {employee?.firstName} {employee?.lastName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                <div className='flex  justify-between gap-8'>
                  <div className='flex flex-col'>
                    <div className='text-sm'>Phone</div>
                    <p className='font-semibold'>{employee?.phoneNumber}</p>
                  </div>

                  <div className='flex flex-col'>
                    <div className='text-sm'>Address</div>
                    <p className='font-semibold'>
                      {employee?.addresses[0].addressLine}
                    </p>
                  </div>

                  <div className='flex flex-col'>
                    <div className='text-sm'>Email</div>
                    <p className='font-semibold'>{employee?.emailAddress}</p>
                  </div>
                </div>

                <div className='flex  justify-between gap-8'>
                  <div className='flex flex-col'>
                    <div className='text-sm'>Store</div>
                    <p className='font-semibold'>{employee?.store.name}</p>
                  </div>

                  <div className='flex flex-col'>
                    <div className='text-sm'>Address</div>
                    <p className='font-semibold'>{employee?.store.address}</p>
                  </div>

                  <div className='flex flex-col'>
                    <div className='text-sm'>Post code</div>
                    <p className='font-semibold'>{employee?.store.postcode}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          "Error loading customer details"
        )}
      </div>
    </div>
  );
}
