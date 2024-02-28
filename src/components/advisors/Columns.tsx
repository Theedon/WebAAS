"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AdvisorsDataType = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  faculty: string;
  phone_no?: string;
};

export const columns: ColumnDef<AdvisorsDataType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
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
    header: "Email",
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
  {
    accessorKey: "updated_at",
    header: "Updated",
  },
];
