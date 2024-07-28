"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns, OrderColumn } from "@/components/admin-site/order/columns";

interface OrderClientProps {
    data : OrderColumn[]
}

export const OrderClient : React.FC<OrderClientProps> = ( {
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title= {`Orders : ${data.length}`}
                    description=" View all orders for your store." 
                />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="products" />
        </> 
    )
}
