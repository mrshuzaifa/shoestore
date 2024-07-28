
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CategoryColumn } from "@/components/admin-site/category/columns";
import { CategoryClient } from "@/components/admin-site/category/client";

const CategoriesPage = async ( {
    params
} : {params : {storeId : string} }) => {
    const categories = await prismadb.category.findMany( {
        where : {
            storeId : params.storeId
        },
        include : {
            billboard : true
        },
        orderBy : {
            createdAt : 'desc'
        }
    })
    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
            id : item.id,
            name : item.name,
            billboardImageUrl : item.billboard.imageUrl,
            updatedAt :  format(item.updatedAt, "MMMM do, yyyy"), 
        }));
    return ( 
        <div className="flex-col w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data = {formattedCategories} />
            </div>
        </div>
     );
}
 
export default CategoriesPage;