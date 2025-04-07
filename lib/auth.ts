import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Convert secret to Uint8Array (jose requires this format)
const encoder = new TextEncoder();
const secretKey = encoder.encode(JWT_SECRET);

export async function createToken(user: { _id: string; username: string }) {
  return await new SignJWT({ userId: user._id.toString(), username: user.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}
