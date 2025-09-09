// app/api/favorites/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 200 });

  const user = await prismadb.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json([], { status: 200 });

  const favs = await prismadb.favorite.findMany({
    where: { userId: user.id },
    include: { movie: true },
  });

  return NextResponse.json(favs.map(f => f.movie));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { movieId } = await req.json();
  if (!movieId) return NextResponse.json({ error: "movieId required" }, { status: 400 });

  const user = await prismadb.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const exists = await prismadb.favorite.findUnique({
    where: { userId_movieId: { userId: user.id, movieId } },
  });
  if (exists) return NextResponse.json({ ok: true }, { status: 200 });

  const fav = await prismadb.favorite.create({ data: { userId: user.id, movieId } });
  return NextResponse.json(fav, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { movieId } = await req.json();
  if (!movieId) return NextResponse.json({ error: "movieId required" }, { status: 400 });

  const user = await prismadb.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await prismadb.favorite.deleteMany({ where: { userId: user.id, movieId } });
  return NextResponse.json({ ok: true }, { status: 200 });
}
