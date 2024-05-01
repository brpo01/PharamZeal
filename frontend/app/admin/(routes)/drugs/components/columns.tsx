"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type DrugColumn = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  expiry_date: string;
};

export const columns: ColumnDef<DrugColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
