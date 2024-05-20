"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type EmployeeColumn = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  id: number;
  phoneNumber: string;
  addresses: [];
  role: {
    id: number;
    name: string;
  };
  store: {
    id: number;
    name: string;
    address: string;
    postcode: string;
  };
};

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
