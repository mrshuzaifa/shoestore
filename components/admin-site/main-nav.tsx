"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Store } from "lucide-react";
import Logo from "@/components/logo";

export function MainNav({
    className,
    ...props
} : React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const routes = [
        {
            href : `/admin/dashboard/${params.storeId}`,
            label : 'Dashboard',
            active : pathname === `/admin/dashboard/${params.storeId}`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/billboards`,
            label : 'Billboards',
            active : pathname === `/admin/dashboard/${params.storeId}/billboards`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/categories`,
            label : 'Categories',
            active : pathname === `/admin/dashboard/${params.storeId}/categories`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/sizes`,
            label : 'Sizes',
            active : pathname === `/admin/dashboard/${params.storeId}/sizes`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/colors`,
            label : 'Colors',
            active : pathname === `/admin/dashboard/${params.storeId}/colors`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/products`,
            label : 'Products',
            active : pathname === `/admin/dashboard/${params.storeId}/products`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/orders`,
            label : 'Orders',
            active : pathname === `/admin/dashboard/${params.storeId}/orders`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/users`,
            label : 'Users',
            active : pathname === `/admin/dashboard/${params.storeId}/users`,
        },
        {
            href : `/admin/dashboard/${params.storeId}/settings`,
            label : 'Settings',
            active : pathname === `/admin/dashboard/${params.storeId}/settings`,
        }
    ];
    return(
        <>
        <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm">
            {routes.map((route) => (
                <Link 
                    key = {route.href}
                    href = {route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                {route.label}
                </Link>
            ))}
        </nav>
        <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 lg:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader className="hidden">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Links</SheetDescription>
            </SheetHeader>
          <nav className="grid gap-6 text-lg font-medium">
          <Logo />
          {routes.map((route) => (
                <Link 
                    key = {route.href}
                    href = {route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                {route.label}
                </Link>
            ))}
            </nav>
          </SheetContent>
        </Sheet>
        </>
    )
};