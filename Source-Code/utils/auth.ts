import { SignJWT, jwtVerify } from "jose";

const NGO_JWT_SECRET = process.env.JWT_SECRET || "default_super_secret_for_student_project_123";
const ngo_secretKey = new TextEncoder().encode(NGO_JWT_SECRET);

export async function ngo_signToken(payload: { userId: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(ngo_secretKey);
}

export async function ngo_verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, ngo_secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}
