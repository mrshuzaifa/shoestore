"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { CategoryColumn } from "./columns";

interface CellActionProps {
    data : CategoryColumn 
}
const CellAction : React.FC<CellActionProps> = ({
    data
}) => {
    const [loading, setLoading] = useState(false); 
    const [open, setOpen] = useState(false); 
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Id copied to the clipboard.");
    }
    const onDelete = async () => {
        try {
            setLoading(true) 
            await axios.delete(`/api/stores/${params.storeId}/categories/${data.id}/`);
            router.refresh();
            toast.success("Category Deleted.");
        } catch (error) {
            toast.error("Make sure you removed all the products under this category first.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    const router = useRouter();
    const params = useParams();
    return ( 
        <>
        <AlertModal 
            isOpen = {open}
            onClose={()=>{setOpen(false)}}
            onConfirm = {onDelete}
            loading = {loading}
        /> 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                        Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/admin/dashboard/${params.storeId}/categories/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4" /> 
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}
 
export default CellAction;