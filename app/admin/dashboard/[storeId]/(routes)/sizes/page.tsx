
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "@/components/admin-site/size/columns";
import { format } from "date-fns";
import { SizeClient } from "@/components/admin-site/size/client";

const SizesPage = async ( {
    params
} : {params : {storeId : string} }) => {
    const sizes = await prismadb.size.findMany( {
        where : {
            storeId : params.storeId
        },
        orderBy : {
            createdAt : 'desc'
        }
    })
    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
            id : item.id,
            name : item.name,
            value : item.value,
            createdAt :  format(item.createdAt, "MMMM do, yyyy"), 
        }));
    return ( 
        <div className="flex-col w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data = {formattedSizes} />
            </div>
        </div>
     );
}
 
export default SizesPage;