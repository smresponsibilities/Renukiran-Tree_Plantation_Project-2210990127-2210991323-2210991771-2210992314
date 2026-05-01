import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../../lib/mongodb";
import Partner from "../../../../models/Partner";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ngo_dbConnect();
    const ngo_allPartners = await Partner.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: ngo_allPartners });
  } catch (e: any) {
    return NextResponse.json({ data: [], error: e.message });
  }
}

export async function POST(req: Request) {
  try {
    await ngo_dbConnect();
    const ngo_partnerData = await req.json();
    const ngo_newPartner = await Partner.create(ngo_partnerData);
    return NextResponse.json({ success: true, data: ngo_newPartner });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await ngo_dbConnect();
    const { id } = await req.json();
    await Partner.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
