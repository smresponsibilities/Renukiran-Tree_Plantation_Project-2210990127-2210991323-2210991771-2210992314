import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/Order";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ngo_dbConnect();
    const ngo_allOrders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: ngo_allOrders });
  } catch (e: any) {
    return NextResponse.json({ data: [], error: e.message });
  }
}

export async function PUT(req: Request) {
  try {
    await ngo_dbConnect();
    const { orderId, validated } = await req.json();
    const ngo_updatedOrder = await Order.findByIdAndUpdate(orderId, { certificateValidated: validated }, { new: true });
    return NextResponse.json({ success: true, data: ngo_updatedOrder });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
