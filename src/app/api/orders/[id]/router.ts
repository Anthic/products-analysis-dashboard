import { ApiResponse } from "@/lib/types/api";
import { Order } from "@/lib/types/order";
import ordersData from "@/data/mock/orders.json"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request:NextRequest, {params} : {params : Promise<{id : string}>}) : Promise<NextResponse<ApiResponse<Order>>> {
    try {
        const {id} = await params
        const order = (ordersData as Order[]).find(
            (ord) => ord.id === id || ord.orderNumber.toLowerCase() === id.toLowerCase()
        )

        if (!order) {
            return NextResponse.json(
                {
                    status : 'error',
                    message : `Order with ID ${id} not found`,
                    code : 'NOT_FOUND',
                }, {status : 404}
            )
        }
        return NextResponse.json ({
            status : 'success',
            data : order

        })

    } catch (error) {
return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to fetch order details',
      },
      { status: 500 }
    );
    }
}