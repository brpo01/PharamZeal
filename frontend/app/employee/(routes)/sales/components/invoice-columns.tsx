"use client";

import { ColumnDef } from "@tanstack/react-table";

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
  tax?: number;
};

export const invoiceColumns: ColumnDef<DrugColumn>[] = [
  {
    accessorKey: "drugName",
    header: "Drug Name",
  },
  {
    accessorKey: "price",
    header: "Rate",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "tax",
    header: "Tax",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
