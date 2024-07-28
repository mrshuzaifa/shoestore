"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import CellAction from "./cell-action"
import { Button } from "../../ui/button"
import { ArrowUpDown } from "lucide-react"

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
  imageUrl : string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'alphanumeric'
  },
  {
    accessorKey: "imageUrl",
    header: "Billboard",
    cell: ({ row }) => {
       return <Image
      src={row.getValue("imageUrl")}
      width={100}
      height={100}
      alt={`${row.getValue("label")}`}
      style={{height:'auto', width: 'auto'}}
    />
    }
  },
  {
    accessorKey: "createdAt",
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
