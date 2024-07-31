"use client"

import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../theme";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    const cart = useCart();
    const router = useRouter();

    if(!isMounted) {
        return null; 
    }

    return ( 
    <div className="ml-auto flex">
        <div><ModeToggle /></div>
        <Button onClick={()=> router.push("/cart")} className="rounded-full ml-1">
            <ShoppingBag 
            size = {20}
            color="white"
            className="hidden md:block"
            />
            <span className="md:ml-2 ml-0">{cart.items.length}</span>
        </Button>
    </div>
 );
}
 
export default NavbarActions;