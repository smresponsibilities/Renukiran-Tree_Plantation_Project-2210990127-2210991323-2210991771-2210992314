import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../lib/mongodb";
import Project from "../../../models/Project";

export const dynamic = "force-dynamic";

const ngo_seedProjects = [
  { title: "Aravalli Reforestation 2026", description: "Restoring the degraded landscapes of the Aravalli hills with native drought-resistant flora.", location: "Rajasthan", targetTrees: 15000, treesPlanted: 11250, status: "Active" },
  { title: "Western Ghats Restoration", description: "Conserving the biodiversity hotspots of the Western Ghats.", location: "Karnataka", targetTrees: 25000, treesPlanted: 22500, status: "Active" },
  { title: "Sundarbans Mangrove Drive", description: "Protecting coastal lines by planting dense mangrove clusters.", location: "West Bengal", targetTrees: 10000, treesPlanted: 10000, status: "Completed" },
  { title: "Delhi NCR Urban Forest", description: "Creating dense Miyawaki forests to act as green lungs for the metro area.", location: "Delhi", targetTrees: 5000, treesPlanted: 2100, status: "Active" },
];

export async function GET() {
  try {
    await ngo_dbConnect();

    let ngo_projectCount = await Project.countDocuments();
    if (ngo_projectCount === 0) {
      await Project.insertMany(ngo_seedProjects);
    }

    const ngo_allProjects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ data: ngo_allProjects });
  } catch {
    // DB unreachable — return seed data
    console.warn("[API /projects] Database unreachable, returning seed data");
    return NextResponse.json({ data: ngo_seedProjects.map((p, i) => ({ ...p, _id: `seed-${i}` })) });
  }
}
