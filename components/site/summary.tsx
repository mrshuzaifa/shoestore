"use client";
import axios from "axios";
import Currency from "./currency";
import { Button } from "../ui/button";
import useCart from "@/hooks/use-cart";
import { stat } from "fs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0);
    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
        });
        window.location = response.data.url;
    }
    useEffect(() =>{
        if(searchParams.get("success")) {
            toast.success("Payment completed.");
            removeAll();
        }
        if(searchParams.get("canceled")) {
            toast.error("Something went wrong.");
        }
    }, [searchParams, removeAll])
    return ( 
        <div className="mt-16 rounded-lg bg-gray-50 dark:bg-neutral-800 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                Order Summary
            </h2>
            <div className="mt-6 space-y">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900 dark:text-gray-50">
                        Order Total: 
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button disabled={items.length === 0 } className="w-full mt-6" onClick={onCheckout}>Checkout</Button>
        </div>
    );
}
 
export default Summary;