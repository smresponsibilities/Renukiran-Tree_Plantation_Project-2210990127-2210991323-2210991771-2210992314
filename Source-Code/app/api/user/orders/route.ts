import { NextRequest, NextResponse } from "next/server";
import { ngo_verifyToken } from "../../../../utils/auth";
import ngo_dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/Order";

export async function GET(req: NextRequest) {
  try {
    const ngo_authToken = req.cookies.get("auth_token")?.value;
    if(!ngo_authToken) throw new Error("Unauthorized");
    const ngo_payload: any = await ngo_verifyToken(ngo_authToken);
    
    if (ngo_payload.userId === "admin_env") {
      return NextResponse.json({ data: [] });
    }

    await ngo_dbConnect();
    const ngo_userOrders = await Order.find({ userId: ngo_payload.userId }).sort({ createdAt: -1 });
    return NextResponse.json({ data: ngo_userOrders });
  } catch(e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
