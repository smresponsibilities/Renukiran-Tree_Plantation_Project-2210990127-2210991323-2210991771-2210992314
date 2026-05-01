import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../../lib/mongodb";
import Tree from "../../../../models/Tree";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ngo_dbConnect();
    const ngo_allTrees = await Tree.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: ngo_allTrees });
  } catch (e: any) {
    return NextResponse.json({ data: [], error: e.message });
  }
}

export async function POST(req: Request) {
  try {
    await ngo_dbConnect();
    const ngo_treeData = await req.json();
    const ngo_newTree = await Tree.create(ngo_treeData);
    return NextResponse.json({ success: true, data: ngo_newTree });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await ngo_dbConnect();
    const { id } = await req.json();
    await Tree.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
