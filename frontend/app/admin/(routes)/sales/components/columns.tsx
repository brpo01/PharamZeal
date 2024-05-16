"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type SaleColumn = {
  id: number;
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
};

export const columns: ColumnDef<SaleColumn>[] = [
  {
    accessorKey: "full_name",
    header: "Customer",
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
  },
  {
    accessorKey: "date_of_sale",
    header: "Date of sale",
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
