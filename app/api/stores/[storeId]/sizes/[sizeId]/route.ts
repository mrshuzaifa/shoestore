import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    { params } : { params : { storeId : string , sizeId : string }}
) {
    try {
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        if(!params.sizeId) {
            return new NextResponse("Size id is required", {status : 401})
        }
        const size = await prismadb.size.findUnique({
            where : {
                id : params.sizeId,
            }, 
        });
        return NextResponse.json(size);

    } catch (error) {
        console.log('[size_get]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function PATCH (
    req : Request,
    { params } : { params : { storeId : string, sizeId : string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body; 
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
        if(!value) {
            return new NextResponse("Value is required", {status : 400})
        }
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        if(!params.sizeId) {
            return new NextResponse("Size id is required", {status : 401})
        }
        const size = await prismadb.size.update({
            where : {
                id : params.sizeId,
            }, 
            data : {
                name, 
                value
            }
        });
        return NextResponse.json(size)

    } catch (error) {
        console.log('[size_patch]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function DELETE(
    req : Request,
    { params } : { params : { storeId : string , sizeId : string }}
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
        if(!params.sizeId) {
            return new NextResponse("Size id is required", {status : 401})
        }
        const size = await prismadb.size.delete({
            where : {
                id : params.sizeId,
            }, 
        });
        return NextResponse.json(size)

    } catch (error) {
        console.log('[size_delete]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}