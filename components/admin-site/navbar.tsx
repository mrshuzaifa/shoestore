import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/admin-site/main-nav";
import StoreSwitcher from "@/components/admin-site/store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Logo from "../logo";
import { ModeToggle } from "../theme";

const Navbar = async () => {
    const { userId } = auth();

    if(!userId) {
        redirect('/sign-in')
    }
    const stores = await prismadb.store.findMany({
        where : {
            userId,
        }
    })
    return ( 
        <header className="sticky top-0 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
            <Logo /><MainNav className="mx-6" />
            {/*<StoreSwitcher items = {stores} />*/}
            <div className="ml-auto flex">
                <div className="mr-4"><ModeToggle /></div>
                <UserButton />
            </div>
        </header>
     );
}
 
export default Navbar;