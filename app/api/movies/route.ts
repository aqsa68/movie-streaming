// app/api/movies/route.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") ?? "";
    const genre = url.searchParams.get("genre") ?? "";

    const rows = await prismadb.movie.findMany({
      where: search ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { genre: { contains: search, mode: "insensitive" } },
        ],
      } : undefined,
      orderBy: { createdAt: "desc" },
    });

    const mapped = rows.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      thumbnailUrl: m.thumbnailUrl ?? m.imageUrl ?? "https://via.placeholder.com/600x900?text=No+Image",
      imageUrl: m.imageUrl ?? null,
      videoUrl: m.videoUrl ?? null,
      genre: m.genre ? m.genre.split(",").map(s => s.trim()) : [],
      duration: m.duration ?? 0,
      createdAt: m.createdAt?.toISOString() ?? null,
    }));

    const filtered = genre ? mapped.filter(m => m.genre.includes(genre)) : mapped;

    return NextResponse.json(filtered);
  } catch (err) {
    console.error("GET /api/movies error:", err);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
