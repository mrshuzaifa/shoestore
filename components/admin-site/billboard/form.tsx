"use client"

import Heading from "@/components/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client"
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ImageUpload from "../../image-upload";

const formSchema = z.object({
    label : z.string().min(1, {
        message : "Give your billboard a meaningful name.",
    }),
    imageUrl : z.string().min(1, {
        message : "You haven't uploaded the billboard. "
    })
})
type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData : Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit" : "New" ;
    const description =  initialData ? "Update an exisiting billboard" : "Create a new billboard" ;
    const toastMessage =  initialData ? "Billboard Updated" : "Billboard Created" ;
    const action =  initialData ? "Save" : "Create" ;

    const form = useForm<BillboardFormValues> ({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            label: "",
            imageUrl: ""
        }
    })
    const onSubmit = async (data : BillboardFormValues) => {
        try {
            setLoading(true);
            if(initialData){
                await axios.patch(`/api/stores/${params.storeId}/billboards/${params.billboardId}/`, data);
            } else {
                await axios.post(`/api/stores/${params.storeId}/billboards/`, data);
            } 
            toast.success(toastMessage);
            router.push(`/admin/dashboard/${params.storeId}/billboards/`)
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
            await axios.delete(`/api/stores/${params.storeId}/billboards/${params.billboardId}/`);
            toast.success("Billboard Deleted.");
            router.push(`/admin/dashboard/${params.storeId}/billboards/`)
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.")
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
                    Delete Billboard
                    <Trash className="h-4 w-4 mx-2"/>
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
                    name= "imageUrl"
                    render = { ({field}) => {
                        return (
                        <FormItem>
                            <FormLabel className="block mb-2">
                                Billboard Image
                            </FormLabel>
                            <FormControl>
                                <ImageUpload
                                    multiple={false}
                                    value={field.value ? [field.value] : []} 
                                    disabled = {loading}
                                    onChange={(urls) => field.onChange(urls[0])}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )} 
                }
                />
                </div>
                <div className="mb-5">
                <FormField  
                    control={form.control}
                    name= "label"
                    render = { ({field}) => (
                        <FormItem>
                            <FormLabel className="block mb-2">
                                Label
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled = {loading}
                                    placeholder = "Billboard Label"
                                    {...field} 
                                />
                            </FormControl>
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