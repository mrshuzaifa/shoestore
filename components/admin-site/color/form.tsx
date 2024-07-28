"use client"

import Heading from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color} from "@prisma/client"
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
const formSchema = z.object({
    name : z.string().min(1, {
        message : "Enter a color name.",
    }),
    value : z.string().min(4, {
        message : "Enter a valid color value."
    }).regex(/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i, {
        message: "Enter a valid hex code."
    })
})
type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
    initialData : Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const [color, setColor] = useColor("#123123");
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit" : "New" ;
    const description =  initialData ? "Update an exisiting color." : "Add a new color to your store." ;
    const toastMessage =  initialData ? "Color Updated" : "Color Created" ;
    const action =  initialData ? "Save" : "Create" ;

    const form = useForm<ColorFormValues> ({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            name: "",
            value: ""
        }
    })
    const onSubmit = async (data : ColorFormValues) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/stores/${params.storeId}/colors/${params.colorId}/`, data);
            } else {
                await axios.post(`/api/stores/${params.storeId}/colors/`, data);
            } 
            toast.success(toastMessage);
            router.push(`/admin/dashboard/${params.storeId}/colors/`)
        } catch (error) {
            toast.error("Somethinng went wrong");
        }
        finally {
            setLoading(false);
            router.refresh();
        }
    }
    const onDelete = async () => {
        try {
            setLoading(true) 
            await axios.delete(`/api/stores/${params.storeId}/sizes/${params.colorId}/`);
            toast.success("Color Deleted.");
            router.push(`/admin/dashboard/${params.storeId}/colors/`)
        } catch (error) {
            toast.error("Make sure you removed all categories and products using this color first.")
        } finally {
            setLoading(false);
            setOpen(false);
            router.refresh();
        }
    }
    return (
        <>
        <AlertModal 
            isOpen = {open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading = {loading}
        />
        <div className="flex items-center justify-between">
            <Heading 
                title = {title}
                description = {description}
            />
            { initialData && 
                <Button 
                    disabled = {loading}
                    variant="destructive"
                    size = "sm"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            }
        </div>
        <Separator />
        <div className="flex flex-row items-center justify-between">
        <Form { ...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                <FormField  
                    control={form.control}
                    name= "name"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled = {loading}
                                    placeholder = "Color Name"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name= "value"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel>
                                Value
                            </FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-x-4">
                                    <Input 
                                        disabled = {loading}
                                        placeholder = "Color Value"
                                        {...field} 
                                    /> 
                                    <div 
                                        className="border p-4 rounded-full"
                                        style={{backgroundColor : color.hex}}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ColorPicker color={color} onChange={setColor} />
                </div>
                <Button 
                    disabled = {loading}
                    className="ml-auto"
                    type= "submit"
                >
                    {action}
                </Button>
            </form>
        </Form>
        </div>
        </>
    )
}