"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentsDataType = {
  // id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  // updated_at: string;
  faculty: string;
  phone_no?: string;
};

export const columns: ColumnDef<StudentsDataType>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "faculty",
    header: "Faculty",
  },
  {
    accessorKey: "phone_no",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: "Joined",
  },
  // {
  //   accessorKey: "updated_at",
  //   header: "Updated",
  // },
];
