import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { ngo_signToken } from "../../../../utils/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const NGO_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@renukiran.org";
    const NGO_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

    if (email === NGO_ADMIN_EMAIL && password === NGO_ADMIN_PASSWORD) {
      const ngo_token = await ngo_signToken({ userId: "admin_env", role: "admin" });
      const ngo_response = NextResponse.json({ success: true, user: { name: "System Admin", email: NGO_ADMIN_EMAIL, role: "admin" } });
      ngo_response.cookies.set({
        name: "auth_token",
        value: ngo_token,
        httpOnly: true,
        path: "/",
        maxAge: 86400
      });
      return ngo_response;
    }

    await ngo_dbConnect();
    const ngo_foundUser = await User.findOne({ email });
    if (!ngo_foundUser) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ngo_passwordMatch = await bcrypt.compare(password, ngo_foundUser.password);
    if (!ngo_passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ngo_token = await ngo_signToken({ userId: ngo_foundUser._id.toString(), role: ngo_foundUser.role });
    
    const ngo_response = NextResponse.json({ success: true, user: { name: ngo_foundUser.name, email: ngo_foundUser.email, role: ngo_foundUser.role } });
    ngo_response.cookies.set({
      name: "auth_token",
      value: ngo_token,
      httpOnly: true,
      path: "/",
      maxAge: 86400
    });
    
    return ngo_response;
  } catch {
    return NextResponse.json({ error: "Service temporarily unavailable. Please try again later." }, { status: 500 });
  }
}
