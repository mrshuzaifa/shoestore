"use client"

import CartItem from "@/components/site/cart-item";
import NoItems from "@/components/site/no-items";
import Summary from "@/components/site/summary";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
const CartPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true)
    },[])
    const cart = useCart();
    if(!isMounted){
        return null;
    }
    return ( 
        <div className="bg-white dark:bg-gray-950">
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                    <div className="lg:col-span-7">
                        {cart.items.length === 0 && <NoItems />}
                        <ul className="">
                            {cart.items.map((item) => (
                                <CartItem 
                                    key={item.id}
                                    data={item}
                                />
                            ))}
                        </ul>
                    </div>
                    <Summary />
                </div>
            </div>
        </div>
     ); 
}
 
export default CartPage;