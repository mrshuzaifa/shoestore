"use client"

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
    data: Product;
}
const ProductCard : React.FC<ProductCardProps> = ({
    data
}) => {
    const cart = useCart();
    const previewModal = usePreviewModal();
    const router = useRouter();
    const handleClick = () => {
        router.push(`/products/${data?.id}`)
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }
    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }
    return ( 
        <div className="bg-white dark:bg-neutral-800 group rounded-xl border p-3 space-y-4">
            
            <div className="aspect-square rounded-xl bg-gray-100 dark:bg-neutral-500 relative">
                <Image 
                    alt={data?.name}
                    src={data?.images?.[0]?.url}
                    fill 
                    className="aspect-square object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition absolute bottom-5 px-6 w-full">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                        onClick={onPreview}
                        icon={<Expand size={20}  />}
                        />
                        <IconButton 
                        onClick={onAddToCart}
                        icon={<ShoppingCart size={20}  />}
                        />
                    </div>
                </div> 
            </div>  

            <div onClick= {handleClick} className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-600" >
                <p className="font-semibold text-lg">{data.name}</p>   
                <p className="text-sm text-gray-500 dark:text-neutral-300">{data.category.name}</p>  
                <div className="flex-col w-full">
                    <div className="block justify-start left-0 top-0">
                        <Currency value={data.price} />
                    </div>
                    <div className="flex w-full">
                        <div className="lg:hidden block">
                            <IconButton
                                className="inline-block" 
                                onClick={onPreview}
                                icon={<Expand size={20}  />}
                            />
                            <IconButton 
                                className="inline-block"
                                onClick={onAddToCart}
                                icon={<ShoppingCart size={20}  />}
                            />
                        </div>
                    </div>
                </div>
            </div>       
        </div>
     );
}
 
export default ProductCard;