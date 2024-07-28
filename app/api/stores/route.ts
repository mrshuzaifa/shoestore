import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try{
        const {userId} = auth();
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
            return new NextResponse("Name is required", {status: 400});
        }
        const store = await prismadb.store.create ({
            data : {
                name, 
                userId
            }
        });
        return NextResponse.json(store);

    } catch (error) {
        console.log('[stores_post]', error);
        return new NextResponse("Internal Error", {status : 500});
    }
}