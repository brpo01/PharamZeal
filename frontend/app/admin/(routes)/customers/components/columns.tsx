"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type CustomerColumn = {
  id: number;
  full_name: string;
  address: string;
  allergy: string;
  date_of_birth: string;
  firstname: string;
  gender: string;
  lastname: string;
  medical_history: string;
  mobileNumber: string;
  postcode: string;
  sales: number;
  store_name: string;
  age?: number;
};

export const columns: ColumnDef<CustomerColumn>[] = [
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "store_name",
    header: "Store",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "mobileNumber",
    header: "Pnone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
