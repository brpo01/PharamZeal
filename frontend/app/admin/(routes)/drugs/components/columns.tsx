"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type DrugColumn = {
  id: string;
  price: string | number;
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
};

export const columns: ColumnDef<DrugColumn>[] = [
  {
    accessorKey: "drugName",
    header: "Drug name",
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "availability",
    header: "Available",
  },
  {
    accessorKey: "id_check",
    header: "Check ID",
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
