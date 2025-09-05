// lib/movies.ts
import prismadb from "./prismadb"; // path to your Prisma client
import { Movie } from "../types";

export const getMovies = async (): Promise<Movie[]> => {
  const data = await prismadb.movie.findMany();
  return data.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    thumbnailUrl: movie.thumbnailUrl || movie.imageUrl || "/placeholder.png",
    genre: Array.isArray(movie.genre) ? movie.genre : [movie.genre],
    duration: movie.duration || 0,
  }));
};
