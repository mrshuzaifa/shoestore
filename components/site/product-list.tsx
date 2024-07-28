import { Product } from "@/types";
import { date } from "zod";
import NoResults from "./no-result";
import ProductCard from "./product-card";

interface ProductListProps {
    title: string;
    items: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
    title, 
    items
}) => {
    return ( 
        <div className="">
            <h3 className="font-bold text-2xl md:text-3xl text-muted-foreground mb-2">{title}</h3>
            {items.length === 0 && <NoResults />}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {items.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
            </div> 
        </div>
     );
}
 
export default ProductList;