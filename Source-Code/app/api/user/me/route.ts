import { NextRequest, NextResponse } from "next/server";
import { ngo_verifyToken } from "../../../../utils/auth";
import ngo_dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET(req: NextRequest) {
  try {
    const ngo_authToken = req.cookies.get("auth_token")?.value;
    if(!ngo_authToken) throw new Error("Unauthorized");
    const ngo_payload: any = await ngo_verifyToken(ngo_authToken);
    
    if (ngo_payload.userId === "admin_env") {
      return NextResponse.json({ user: { name: "System Admin", email: "admin@renukiran.org", role: "admin" }});
    }

    await ngo_dbConnect();
    const ngo_foundUser = await User.findById(ngo_payload.userId);
    if (!ngo_foundUser) throw new Error("User missing");

    return NextResponse.json({ user: { name: ngo_foundUser.name, email: ngo_foundUser.email }});
  } catch(e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
