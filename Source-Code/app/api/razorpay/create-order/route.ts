import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const ngo_razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummykey123",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "dummysecret123",
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const ngo_orderOptions = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const ngo_createdOrder = await ngo_razorpayInstance.orders.create(ngo_orderOptions);
    
    return NextResponse.json(ngo_createdOrder);
  } catch (error) {
    console.error("Razorpay Create Order Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
