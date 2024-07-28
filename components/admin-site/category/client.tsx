"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import { CategoryColumn, columns } from "./columns";

interface CategoryClientProps {
    data : CategoryColumn[]
}

export const CategoryClient : React.FC<CategoryClientProps> = ( {
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title= {`Categories : ${data.length}`}
                    description=" Manage categories for your store." 
                />
                <Button onClick={() => router.push(`/admin/dashboard/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                        Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API Calls for Categories" />
            <ApiList entityName="categories" entityIdName="categoryId" />
            <Separator /> 
        </>
    )
}
