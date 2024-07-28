"use client"

import Heading from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client"
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import Image from "next/image";
const formSchema = z.object({
    name : z.string().min(1, {
        message : "Provide a meaningful name for your products category."
    }),
    billboardId : z.string().min(1, {
        message : "Select a billboard for your products category. "
    })
})
type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
    initialData : Category | null;
    billboards : Billboard [];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit" : "New" ;
    const description =  initialData ? "Update an exisiting category" : "Create a new category" ;
    const toastMessage =  initialData ? "Category Updated" : "Category Created" ;
    const action =  initialData ? "Save" : "Create" ;

    const form = useForm<CategoryFormValues> ({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            name: "",
            billboardId: ""
        }
    })
    const onSubmit = async (data : CategoryFormValues) => {
        try { 
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/stores/${params.storeId}/categories/${params.categoryId}/`, data);
            } else {
                await axios.post(`/api/stores/${params.storeId}/categories/`, data);
            }
            toast.success(toastMessage);
            router.push(`/admin/dashboard/${params.storeId}/categories/`)
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
            await axios.delete(`/api/stores/${params.storeId}/categories/${params.categoryId}/`);
            toast.success("Category Deleted.");
            router.push(`/admin/dashboard/${params.storeId}/categories/`)
        } catch (error) {
            toast.error("Make sure you removed all categories using this category first.")
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
        <div className="block">
        <Form { ...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm">
                <div className="mb-5">
                <FormField  
                    control={form.control}
                    name= "name"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel className="block mb-2">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled = {loading}
                                    placeholder = "Category Name"
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <div className="mb-5">
                <FormField  
                    control={form.control}
                    name= "billboardId"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel  className="block mb-2">
                                Billboard
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
                                        placeholder = "Select a billboard"
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {billboards.map((billboard) => (
                                        <SelectItem
                                            key={billboard.id}
                                            value={billboard.id}
                                        >
                                            <Image
                                            src={billboard.imageUrl}
                                            width={100}
                                            height={100}
                                            alt={billboard.label}
                                            />
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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