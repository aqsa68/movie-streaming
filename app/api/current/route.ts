// app/api/current/route.ts
import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (err: any) {
    console.error("GET /api/current error:", err);
    return NextResponse.json({ error: err?.message ?? "Unauthorized" }, { status: 401 });
  }
}
