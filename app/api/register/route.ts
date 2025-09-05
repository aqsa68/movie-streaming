import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    console.log("Register request body:", { email, name, password });

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 422 }
      );
    }

    const existingUser = await prismadb.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",           // your schema allows null, empty string is fine
        emailVerified: null, // match nullable field in Prisma
      },
    });

    console.log("User created:", user);

    return NextResponse.json({ message: "User registered", user }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
