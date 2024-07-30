"use client"
import { Product } from "@/types";
import Currency from "./currency";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";

interface InfoProps {
    data: Product;
}
const  Info:React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart();
    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }
    return ( 
        <div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-neutral-200">
                {data.name}
            </h1>
            <div className="mt-3 flex items-end justify-between">
                <div className="text-2xl text-gray-900 dark:text-gray-50">
                    <Currency value={data.price} />
                </div>
            </div>
            <hr className="my-4" />
            <div className=" flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black dark:text-white"> Size: </h3>
                    <div>
                        {data.size.name} {" : "} {data.size.value}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black dark:text-white"> Color: </h3>
                    <div className="h-6 w-6 rounded-full border border-gray-600"
                    style={{backgroundColor: data?.color?.value}}/>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2 hover:text-gray-600 hover:bg-white hover:border hover:border-red-600">
                    Add to Cart
                     <ShoppingCart />
                </Button>
            </div>
        </div>
     );
}
 
export default  Info;