"use client"

import Heading from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Category, Color, Image, Product, Size } from "@prisma/client"
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ImageUpload from "@/components/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name : z.string().min(1, {
        message : "Give your product a meaningful name.",
    }),
    images : z.object({ 
        url : z.string().min(7, { 
            message : "You haven't uploaded the image. "
        }) }).array(),
    price: z.coerce.number().min(1, {
        message : "Enter the price of the product. Don't use characters or currency codes."
    }),
    categoryId: z.string().min(1, {
        message: "Select the category to put the product in."
    }),
    colorId: z.string().min(1, {
        message: "Select the color of your product."
    }),
    sizeId: z.string().min(1, {
        message: "Select the size of your product."
    }),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
})
type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData : Product & {
        images : Image[]
    } | null;
    categories : Category[];
    sizes : Size[];
    colors : Color[];  
}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    sizes,
    colors
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit" : "New" ;
    const description =  initialData ? "Update an exisiting product" : "Create a new product" ;
    const toastMessage =  initialData ? "Product Updated" : "Product Created" ;
    const action =  initialData ? "Save" : "Create" ;

    const form = useForm<ProductFormValues> ({
        resolver : zodResolver(formSchema),
        defaultValues : initialData ? {
            ...initialData,
            price : parseFloat(String(initialData?.price)), 
        }: {
            name: '', 
            images : [],
            price : 0,
            categoryId : '',
            colorId : '',
            sizeId : '',
            isFeatured : false,
            isArchived : false
        }
    })
    const onSubmit = async (data : ProductFormValues) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/stores/${params.storeId}/products/${params.productId}/`, data);
            } else {
                await axios.post(`/api/stores/${params.storeId}/products/`, data);
            } 
            toast.success(toastMessage);
            router.push(`/admin/dashboard/${params.storeId}/products/`)
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
            await axios.delete(`/api/stores/${params.storeId}/products/${params.productId}/`);
            toast.success("Product Deleted.");
            router.push(`/admin/dashboard/${params.storeId}/products/`)
        } catch (error) {
            toast.error("Something went wrong")
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
        <div className="block items-center justify-between">
        <Form { ...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField  
                    control={form.control}
                    name= "images"
                    render = { ({field}) => {
                        return (
                        <FormItem>
                            <FormLabel>
                                Images
                            </FormLabel>
                            <FormControl>
                                <ImageUpload
                                    multiple={true}
                                    value={field.value.map((image) => image.url)} 
                                    disabled = {loading}
                                    onChange={ (urls) => {
                                        field.value = [];
                                        urls.map((url) => { 
                                        field.onChange(field.value = [...field.value, { url } ]);
                                    })
                                    }}
                                    onRemove={(url) => {
                                        field.onChange(field.value = [...field.value.filter((current) => current.url !== url)]);
                                    }}
                                />
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )} 
                }
                />
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
                                    placeholder = "Product Name"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name= "price"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel>
                                Price
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    type="number"
                                    disabled = {loading}
                                    placeholder = "9.99"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name= "categoryId"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <Select 
                                disabled = {loading}
                                onValueChange = {field.onChange}
                                value = {field.value}
                                defaultValue = {field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                        defaultValue = {field.value}
                                        placeholder = "Select a category"
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name= "sizeId"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel>
                                Size
                            </FormLabel>
                            <Select 
                                disabled = {loading}
                                onValueChange = {field.onChange}
                                value = {field.value}
                                defaultValue = {field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                        defaultValue = {field.value}
                                        placeholder = "Select a size"
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sizes.map((size) => (
                                        <SelectItem
                                            key={size.id}
                                            value={size.id}
                                        >
                                            {size.name}
                                            {" "}
                                            {size.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name= "colorId"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel>
                                Color
                            </FormLabel>
                            <Select 
                                disabled = {loading}
                                onValueChange = {field.onChange}
                                value = {field.value}
                                defaultValue = {field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                        defaultValue = {field.value}
                                        placeholder = "Select a color"
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {colors.map((color) => (
                                        <SelectItem
                                            key={color.id}
                                            value={color.id}
                                        >
                                            <div className=" flex items-center gap-x-2">
                                                <div 
                                                className="h-6 w-6 rounded-full border" 
                                                style={{backgroundColor : color.value}}
                                                />{color.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name= "isFeatured"
                    render = { ({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked = {field.value}
                                    onCheckedChange={field.onChange}    
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Featured
                                </FormLabel>
                                <FormDescription>
                                    This product will appear on the Home page
                                </FormDescription>
                            </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name= "isArchived"
                    render = { ({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked = {field.value}
                                    onCheckedChange={field.onChange}    
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Archived
                                </FormLabel>
                                <FormDescription>
                                    This product will not appear anywhere in the store.
                                </FormDescription>
                            </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
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