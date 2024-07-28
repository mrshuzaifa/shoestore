import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH (
    req : Request,
    { params } : { params : { storeId : string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body; 
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
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        const store = await prismadb.store.updateMany({
            where : {
                id : params.storeId,
            }, 
            data : {
                name
            }
        });
        return NextResponse.json(store)

    } catch (error) {
        console.log('[store_patch]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function DELETE(
    req : Request,
    { params } : { params : { storeId : string }}
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
        const store = await prismadb.store.deleteMany({
            where : {
                id : params.storeId
            }, 
        });
        return NextResponse.json(store)

    } catch (error) {
        console.log('[store_delete]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}