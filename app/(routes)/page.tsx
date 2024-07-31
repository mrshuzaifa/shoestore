import getProducts from "@/actions/get-products";
import ProductList from "@/components/site/product-list";
import { shuffleArray } from "@/lib/utils";
import getBillboards from "@/actions/get-billboards";
import Billboards from "@/components/site/billboards";
import MobileFilter from "@/components/site/mobile-filter";
import Filter from "@/components/site/filter";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";

export const revalidate = 0;

export default async function HomePage () {
    const products =await getProducts({ isFeatured : true })
    shuffleArray(products);
    const billboards = await getBillboards();
    const sizes = await getSizes();
    const colors = await getColors();
    return(
        <div className="space-y-10">
            <Billboards data={billboards} />        
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
                        <ProductList title="Featured Products" items={products} />
                    </div>
                </div>
            </div>

        </div>
    )
}