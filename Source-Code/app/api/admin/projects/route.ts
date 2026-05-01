import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../../lib/mongodb";
import Project from "../../../../models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ngo_dbConnect();
    
    // Auto-seed existing hardcoded projects instantly
    let ngo_projectCount = await Project.countDocuments();
    if (ngo_projectCount === 0) {
      await Project.insertMany([
        { title: "Aravalli Reforestation 2026", description: "Restoring the degraded landscapes of the Aravalli hills with native drought-resistant flora.", location: "Rajasthan", targetTrees: 15000, treesPlanted: 11250, status: "Active" },
        { title: "Western Ghats Restoration", description: "Conserving the biodiversity hotspots of the Western Ghats.", location: "Karnataka", targetTrees: 25000, treesPlanted: 22500, status: "Active" },
        { title: "Sundarbans Mangrove Drive", description: "Protecting coastal lines by planting dense mangrove clusters.", location: "West Bengal", targetTrees: 10000, treesPlanted: 10000, status: "Completed" },
        { title: "Delhi NCR Urban Forest", description: "Creating dense Miyawaki forests to act as green lungs for the metro area.", location: "Delhi", targetTrees: 5000, treesPlanted: 2100, status: "Active" }
      ]);
    }
    
    const ngo_allProjects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: ngo_allProjects });
  } catch (e: any) {
    return NextResponse.json({ data: [], error: e.message });
  }
}

export async function POST(req: Request) {
  try {
    await ngo_dbConnect();
    const ngo_projectData = await req.json();
    const ngo_newProject = await Project.create(ngo_projectData);
    return NextResponse.json({ success: true, data: ngo_newProject });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await ngo_dbConnect();
    const { projectId, action, amount } = await req.json();
    if (action === "addTrees") {
      const ngo_updatedProject = await Project.findByIdAndUpdate(projectId, { $inc: { treesPlanted: amount } }, { new: true });
      return NextResponse.json({ success: true, data: ngo_updatedProject });
    }
    return NextResponse.json({ error: "Invalid action" });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await ngo_dbConnect();
    const { id } = await req.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
