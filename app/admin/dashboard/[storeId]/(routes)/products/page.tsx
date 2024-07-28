
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "@/components/admin-site/product/columns";
import { format } from "date-fns";
import { ProductClient } from "@/components/admin-site/product/client";
import { formatter } from "@/lib/utils";
import { url } from "inspector";
import { string } from "zod";

const ProductsPage = async ( {
    params
} : {params : {storeId : string} }) => {
    const products = await prismadb.product.findMany( {
        where : {
            storeId : params.storeId
        },
        include : {
            category: true,
            size : true,
            color : true,
            images: true
        },
        orderBy : {
            createdAt : 'desc'
        }
    })
    const formattedProducts: ProductColumn[] = products.map((item) => ({
            id : item.id,
            name :  item.name,
            isFeatured : item.isFeatured,
            isArchived : item.isArchived,
            price : formatter.format(item.price.toNumber()),
            category : item.category.name,
            size :  item.size.value,
            color:  item.color.value,
            images : item.images.map((image) => (image.url)),
            createdAt :  format(item.createdAt, "MMMM do, yyyy")
        }));
    return ( 
        <div className="flex-col w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data = {formattedProducts} />
            </div>
        </div>
     );
}
 
export default ProductsPage;