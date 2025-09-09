export const dynamic = "force-dynamic";import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"; // adjust path if different

export async function GET() {
  try {
    // Get random 6 movies
    const movies = await prisma.movie.findMany();
    const shuffled = movies.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);

    return NextResponse.json(selected);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
