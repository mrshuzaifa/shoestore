import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params } : { params : { storeId : string }}
) {
    try{
        const {userId} = auth();
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
        const billboard = await prismadb.billboard.create ({
            data : {
                label,
                imageUrl,
                storeId : params.storeId
            }
        });
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[billboard_post]', error);
        return new NextResponse("Internal Error", {status : 500});
    }
}


export async function GET(
    req: Request,
    { params } : { params : { storeId : string }}
) {
    try{
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status : 401})
        }
        const billboard = await prismadb.billboard.findMany ({
            where : {
                storeId : params.storeId
            }
        });
        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[billboards_get]', error);
        return new NextResponse("Internal Error", {status : 500});
    }
}