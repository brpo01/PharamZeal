"use client";

import { ColumnDef } from "@tanstack/react-table";

export type StockColumn = {
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

export const columns: ColumnDef<StockColumn>[] = [
  {
    accessorKey: "drugName",
    header: "Name",
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
    accessorKey: "available_stock",
    header: "Available Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
  },
];
