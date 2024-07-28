import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/site/billboard";
import ProductList from "@/components/site/product-list";
import { shuffleArray } from "@/lib/utils";

export const revalidate = 0;

export default async function HomePage () {
    const products =await getProducts({ isFeatured : true })
    shuffleArray(products);
    const billboard = await getBillboard("c4bb84cb-7b3a-4757-93ab-880518be1996");
    return(
        <div className="space-y-10">
            <Billboard data={billboard} />
        
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductList title="Featured Products"items ={products} />
            </div>

        </div>
    )
}