import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout ({
    children
} : {
    children : React.ReactNode;
}) {
    const { userId } = auth();
    if(!userId) {
        redirect("/sign-in")
    }
    if (!checkRole("admin")) {
        if (!checkRole("moderator"))
            redirect("/");
      }
    const store = await prismadb.store.findFirst({
    });
    if(store){
        redirect(`/admin/dashboard/${store.id}`);
    } 
    return(
        <>
            { children }
        </>
    )
}