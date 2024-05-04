"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type SaleColumn = {
  id: number | string;
  quantity: number;
  date_of_sale: string;
  customer?: any;
  drug?: any;
  drugName: string;
  firstname: string;
  full_name: string;
  name: string;
  store?: any;
  total_price: number | string;
  user?: any;
  status?: string;
};

export const columns: ColumnDef<SaleColumn>[] = [
  {
    accessorKey: "id",
    header: "Invoice No.",
  },
  {
    accessorKey: "date_of_sale",
    header: "Date",
  },
  {
    accessorKey: "full_name",
    header: "Customer name",
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "firstname",
    header: "Cashier",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
