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
  quantity?: number;
};

export const columns: ColumnDef<DrugColumn>[] = [
  {
    accessorKey: "drugName",
    header: "Drug name",
  },
  {
    accessorKey: "drug_code",
    header: "Drug code",
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
