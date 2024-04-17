"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
