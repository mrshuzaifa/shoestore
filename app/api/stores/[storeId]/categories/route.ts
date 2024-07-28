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
        const category = await prismadb.category.create ({
            data : {
                name,
                billboardId,
                storeId : params.storeId
            }
        });
        return NextResponse.json(category);

    } catch (error) {
        console.log('[category_post]', error);
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
        const categories = await prismadb.category.findMany ({
            where : {
                storeId : params.storeId
            }
        });
        return NextResponse.json(categories);

    } catch (error) {
        console.log('[categories_get]', error);
        return new NextResponse("Internal Error", {status : 500});
    }
}