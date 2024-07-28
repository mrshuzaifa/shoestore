"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "@/components/admin-site/product/cell-action"
import Image from "next/image"
import { Button } from "../../ui/button"
import { ArrowUpDown } from "lucide-react"

export type ProductColumn = {
  id : string,
  name : string,
  isFeatured : boolean,
  isArchived : boolean,
  price : string,
  category : string,
  size : string,
  color : string,
  images : string []
  createdAt : string
}

export const columns: ColumnDef<ProductColumn>[] = [
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'alphanumeric'
  },
  {
    accessorKey: "images",
    header: "Photos",
    cell : ({row}) => {
      return (<Image 
        src={row.original.images[0]} 
        alt={`${row.original.name} photo`} 
        width={100} 
        height={100} 
      />)
    }
  },
  {
    accessorKey: "color",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Color
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'alphanumeric',
    cell : ({row}) => (
      <div className=" flex items-center gap-x-2">
        <div 
          className="h-6 w-6 rounded-full border" 
          style={{backgroundColor : row.original.color}}
        />
        {row.original.color.toUpperCase()}
      </div>
    )
  },
  {
    accessorKey: "size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'alphanumeric'
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'alphanumeric'
  },
  {
    accessorKey: "isArchived",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Archived
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'auto'
  },
  {
    accessorKey: "isFeatured",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Featured
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    sortingFn: 'auto'
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
