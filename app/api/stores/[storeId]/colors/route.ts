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
        const color = await prismadb.color.create ({
            data : {
                name, 
                value,
                storeId : params.storeId
            }
        });
        return NextResponse.json(color);

    } catch (error) {
        console.log('[color_post]', error);
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
        const colors = await prismadb.color.findMany ({
            where : {
                storeId : params.storeId
            }
        });
        return NextResponse.json(colors);

    } catch (error) {
        console.log('[colors_get]', error);
        return new NextResponse("Internal Error", {status : 500});
    }
}