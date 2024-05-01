"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type SaleColumn = {
  id: string;
  name: string;
  drug: string;
  quantity: number;
  price: number;
  date_of_sale: string;
};

export const columns: ColumnDef<SaleColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "drug",
    header: "Drug",
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
    accessorKey: "date_of_sale",
    header: "Date of sale",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
