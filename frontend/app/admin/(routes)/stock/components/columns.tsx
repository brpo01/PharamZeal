"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

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
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "availability",
    header: "Available",
  },
  {
    accessorKey: "available_stock",
    header: "Available Stock",
    cell: ({ row }) => (
      <div>
        {row.original.available_stock < 30 ? (
          <div className='text-red-500'>{row.original.available_stock}</div>
        ) : (
          <div className='text-green-500'>{row.original.available_stock}</div>
        )}
      </div>
    ),
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
