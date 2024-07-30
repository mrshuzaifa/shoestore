import getBillboard from "@/actions/get-billboard";
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/site/billboard";
import Filter from "@/components/site/filter";
import MobileFilter from "@/components/site/mobile-filter";
import ProductList from "@/components/site/product-list";
import { shuffleArray } from "@/lib/utils";

export const revalidate = 0;
interface CategoriesPageProps {
    searchParams: {
        colorId : string;
        sizeId: string; 
    }
}

const CategoriesPage: React.FC<CategoriesPageProps> = async ({
    searchParams
}) => {
    const products = await getProducts({
        colorId: searchParams.colorId,
        sizeId: searchParams .sizeId
    })
    shuffleArray(products);
    const billboard = await getBillboard("c4bb84cb-7b3a-4757-93ab-880518be1996");
    const sizes = await getSizes();
    const colors = await getColors();
 
    return ( 
    <div className="bg-white dark:bg-gray-950">
        <div>
            <Billboard data={billboard} />
            <div className="px-4 sm:px-6 lg:px-8 pb-24">
                <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    <MobileFilter sizes={sizes} colors={colors} />
                    <div className="hidden lg:block">
                        <Filter 
                            valueKey = "sizeId"
                            name= "Sizes"
                            data={sizes}
                        />
                        <Filter 
                            valueKey = "colorId"
                            name= "Colors"
                            data= {colors}
                        />
                    </div>
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                        <ProductList title="" items={products} />
                    </div>
                </div>
            </div>
        </div>
    </div>
 );
}
 
export default CategoriesPage;