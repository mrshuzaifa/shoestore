"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import CellAction from "./cell-action"
import { Button } from "../../ui/button"
import { ArrowUpDown } from "lucide-react"

export type CategoryColumn = {
  id: string
  name: string
  billboardImageUrl : string
  updatedAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'alphanumeric'
  },
  {
    accessorKey: "billboardImageUrl",
    header: "Billboard",
    cell: ({ row }) => {
       return <Image
      src={row.getValue("billboardImageUrl")}
      width={100} 
      height={100}
      alt="Picture of the author"
    />
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'datetime'
  },
  {
    id : "actions",
    cell: ({ row }) => <CellAction  data = {row.original} />
  }
]
