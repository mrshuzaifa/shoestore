import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    { params } : { params : { storeId : string , categoryId : string }}
) {
    try {
        if(!params.storeId) { 
            return new NextResponse("Store id is required", {status : 401})
        }
        if(!params.categoryId) {
            return new NextResponse("Category id is required", {status : 401})
        }
        const category = await prismadb.category.findUnique({
            where : {
                id : params.categoryId,
            },
            include : {
                billboard: true
            }
        });
        return NextResponse.json(category)

    } catch (error) {
        console.log('[category_get]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function PATCH (
    req : Request,
    { params } : { params : { storeId : string, categoryId : string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, billboardId } = body; 
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 403});
        } else {
            if (!checkRole("admin")) {
                if (!checkRole("moderator"))
                    return new NextResponse("Unauthorized", {status: 401});
              }
        }
        if(!name) {
            return new NextResponse("Name is required", {status : 400})
        }
        if(!billboardId) {
            return new NextResponse("Billboard Id is required", {status : 400})
        }
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        if(!params.categoryId) {
            return new NextResponse("Category Id is required", {status : 401})
        }
        const category = await prismadb.category.update({
            where : {
                id : params.categoryId,
            }, 
            data : {
                name, 
                billboardId
            }
        });
        return NextResponse.json(category)

    } catch (error) {
        console.log('[category_patch]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function DELETE(
    req : Request,
    { params } : { params : { storeId : string , categoryId : string }}
) {
    try {
        const { userId } = auth();
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 403});
        } else {
            if (!checkRole("admin")) {
                if (!checkRole("moderator"))
                    return new NextResponse("Unauthorized", {status: 401});
              }
        }
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        if(!params.categoryId) {
            return new NextResponse("Category Id is required", {status : 401})
        }
        const category = await prismadb.category.delete({
            where : {
                id : params.categoryId
            }, 
        });
        return NextResponse.json(category)

    } catch (error) {
        console.log('[category_delete]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}