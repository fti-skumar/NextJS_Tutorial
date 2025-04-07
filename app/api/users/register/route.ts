import { connectToDB } from "@/lib/mongoose";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    await connectToDB();
  
    const existing = await User.findOne({ username });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
  
    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }

}
