import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const existingUser = await prismadb.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismadb.user.create({ data: { email, hashedPassword } });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("POST /api/register", err);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
