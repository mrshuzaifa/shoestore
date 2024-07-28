import Navbar from "@/components/admin-site/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Step On | Admin Dashboard",
    description: "Step On Shoe Store Admin Dashboard",
  };

export default async function DashboardLayout({
    children,
    params
} : {
    children : React.ReactNode;
    params : { storeId : string }
}) {
    const { userId } = auth();
    if(!userId) {
        redirect('/sign-in');
    }
    const store = await prismadb.store.findFirst({
        where : {
            id : params.storeId,
        }
    });
    if(!store) {
        redirect('/admin')
    }
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}