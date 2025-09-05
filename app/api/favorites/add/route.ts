/*import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

interface FavoriteRequestBody {
  movieId: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: FavoriteRequestBody = await req.json();
    const favorite = await prismadb.favorite.create({
      data: {
        movieId: body.movieId,
        userId: body.userId,
      },
    });
    return NextResponse.json(favorite);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}*/
