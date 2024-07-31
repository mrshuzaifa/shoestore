"use client"

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Logo from "../logo";

interface MainNavProps {
    data : Category[];
}

const MainNav : React.FC<MainNavProps> = ({
    data
}) => {
    const pathname = usePathname();
    const params = useParams();
    const routes = data.map((route) => ({
        href: `/categories/${route.id}`,
        label: route.name,
        active: pathname === `/categories/${route.id}`
    }))
    return (
        <>
        <nav
            className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm"
        >
            {
                routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-neutral-400" : "text-muted-foreground dark:text-white"
                        )}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
        <Sheet>
            <SheetHeader className="hidden">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Links</SheetDescription>
            </SheetHeader>
            <SheetTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="lg:hidden flex"
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
            </SheetTrigger>
            <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium lg:hidden">
            <Logo />
            {routes.map((route) => (
                    <Link 
                        key = {route.href}
                        href = {route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-neutral-400" : "text-muted-foreground  dark:text-slate-50"
                        )}
                    >
                    {route.label}
                    </Link>
                ))}
                </nav>
            </SheetContent>
        </Sheet>
        </>
     );
}
 
export default MainNav;