"use client"

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { X } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
import Currency from "./currency";

interface CartItemProps{
    data: Product;
}
const CartItem : React.FC<CartItemProps> = ({
    data
}) => {
    const cart = useCart();
    const onRemoveFromCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.removeItem(data.id);
    }
    return ( 
        <li className="flex py-6 border-b">
            <div className="relative h-24 w-24 rounded-md sm:h-48 sm:w-48">
                <Image
                    fill
                    src={data.images[0].url}
                    alt={data.name}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton icon={<X size={15} />} onClick={onRemoveFromCart} className="bg-primary" />
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify between">
                        <p className="text-lg font-semibold text-black dark:text-white">
                            {data.name}
                        </p>
                    </div>
                    <div className="mt-1 flex text-sm">
                    <p className="text-gray-500 dark:text-gray-50 mr-4 border-r border-gray-200 pr-4">{data.size.name}</p>
                        <div  
                            className="mr-3 h-6 w-6 rounded-full border dark:border-gray-50" 
                            style={{backgroundColor : data.color.value}}
                        />
                        <p className="text-gray-500 dark:text-gray-50">{data.color.name}</p>
                    </div>
                    <Currency value={data.price} />
                </div>
            </div>
        </li>
    );
}
 
export default CartItem;