import { NextRequest, NextResponse } from "next/server";
import ngo_dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
import User from "../../../../models/User";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    await ngo_dbConnect();

    const ngo_order = await Order.findById(orderId).lean();
    if (!ngo_order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!(ngo_order as any).certificateValidated) {
      return NextResponse.json(
        { error: "Certificate has not been validated yet" },
        { status: 403 }
      );
    }

    // Get user info
    const ngo_orderUser = await User.findById((ngo_order as any).userId).lean();
    const ngo_userName = (ngo_orderUser as any)?.name || "Valued Supporter";

    let ngo_certificateId = (ngo_order as any).certificateId;
    if (!ngo_certificateId) {
      ngo_certificateId = 'RK-' + require('crypto').randomBytes(4).toString('hex').toUpperCase();
      await Order.findByIdAndUpdate(orderId, { certificateId: ngo_certificateId });
    }

    return NextResponse.json({
      certificateId: ngo_certificateId,
      userName: ngo_userName,
      trees: (ngo_order as any).trees,
      totalAmount: (ngo_order as any).totalAmount,
      createdAt: (ngo_order as any).createdAt,
      razorpayOrderId: (ngo_order as any).razorpayOrderId,
    });
  } catch (error) {
    console.error("Certificate API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
