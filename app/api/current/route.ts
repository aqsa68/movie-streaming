import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

// Force this API route to be dynamic
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("GET /api/current error:", err);
    return NextResponse.json({ error: message ?? "Unauthorized" }, { status: 401 });
  }
}
