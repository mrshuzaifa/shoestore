import getBillboards from "@/actions/get-billboards";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboards from "@/components/site/billboards";
import Filter from "@/components/site/filter";
import MobileFilter from "@/components/site/mobile-filter";
import ProductList from "@/components/site/product-list";
import { shuffleArray } from "@/lib/utils";

interface ProductsPageProps {
    searchParams: {
        colorId : string;
        sizeId: string;
         
    }
}

const ProductsPage: React.FC<ProductsPageProps> = async ({
    searchParams
}) => {
    const products = await getProducts({
        colorId: searchParams.colorId,
        sizeId: searchParams .sizeId
    })
    shuffleArray(products);
    const billboards = await getBillboards();
    const sizes = await getSizes();
    const colors = await getColors();
    return ( 
        <div className="bg-white dark:bg-gray-950">
        <div className="pb-10">
            <Billboards data={billboards} /> 
        </div>
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
                        <ProductList title="All Products" items={products} />
                    </div>
                </div>
            </div>
    </div>
    );
}
 
export default ProductsPage;