import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { ngo_signToken } from "../../../../utils/auth";

export async function POST(req: Request) {
  try {
    await ngo_dbConnect();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ngo_existingUser = await User.findOne({ email });
    if (ngo_existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const ngo_hashedPassword = await bcrypt.hash(password, 10);
    
    const ngo_newUser = await User.create({
      name, email, password: ngo_hashedPassword, role: "user"
    });

    const ngo_token = await ngo_signToken({ userId: ngo_newUser._id.toString(), role: ngo_newUser.role });
    
    const ngo_response = NextResponse.json({ success: true, user: { name: ngo_newUser.name, email: ngo_newUser.email, role: ngo_newUser.role } });
    ngo_response.cookies.set({
      name: "auth_token",
      value: ngo_token,
      httpOnly: true,
      path: "/",
      maxAge: 86400
    });
    
    return ngo_response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
