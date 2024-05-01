"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ContactColumn = {
  store: string;
  phone: string;
};

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
];
