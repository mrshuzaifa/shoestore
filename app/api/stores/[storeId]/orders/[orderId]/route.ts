import prismadb from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { storeId : string , orderId : string }}
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
        if(!params.orderId) {
            return new NextResponse("Order id is required", {status : 401})
        }
        await prismadb.order.update({
            where: {
                id : params.orderId,
            },
            data : {
                orderItems : {
                    deleteMany : {}
                }
            }
        })
        const order = await prismadb.order.delete({
            where : {
                id : params.orderId,
            }, 
        });
        return NextResponse.json(order)

    } catch (error) {
        console.log('[order_delete]', error)
        return new NextResponse("Internal Error", {status : 500})
    }
}