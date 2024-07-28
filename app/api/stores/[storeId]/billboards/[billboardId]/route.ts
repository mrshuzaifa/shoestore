import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(
    req : Request,
    { params } : { params : { storeId : string , billboardId : string }}
) {
    try {
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        if(!params.billboardId) {
            return new NextResponse("Billbboard id is required", {status : 401})
        }
        const billboard = await prismadb.billboard.findUnique({
            where : {
                id : params.billboardId,
            }, 
        });
        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[billboard_get]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function PATCH (
    req : Request,
    { params } : { params : { storeId : string, billboardId : string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { label, imageUrl } = body; 
        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 403});
        } else {
            if (!checkRole("admin")) {
                if (!checkRole("moderator"))
                    return new NextResponse("Unauthorized", {status: 401});
              }
        }
        if(!label) {
            return new NextResponse("Label is required", {status : 400})
        }
        if(!imageUrl) {
            return new NextResponse("Image Url is required", {status : 400})
        }
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        if(!params.billboardId) {
            return new NextResponse("Billbboard id is required", {status : 401})
        }
        const billboard = await prismadb.billboard.update({
            where : {
                id : params.billboardId,
            }, 
            data : {
                label, 
                imageUrl
            }
        });
        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[billboard_patch]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}

export async function DELETE(
    req : Request,
    { params } : { params : { storeId : string , billboardId : string }}
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
        if(!params.billboardId) {
            return new NextResponse("Billbboard id is required", {status : 401})
        }
        const billboard = await prismadb.billboard.delete({
            where : {
                id : params.billboardId,
            }, 
        });
        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[billboard_delete]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}