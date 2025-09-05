"use client";

import React, { useEffect, useState } from "react";
import SafeImage from "@/app/components/SafeImage";

interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  duration?: number;
  thumbnailUrl: string;
  videoUrl?: string;
}

interface Props {
  searchQuery: string;
  genreFilter: string;
}

export default function MoviesList({ searchQuery, genreFilter }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/movies");
        const data: Movie[] = await res.json();
        if (!mounted) return;
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/favorites");
        const data: { movieId: string }[] = await res.json();
        if (!mounted) return;
        setFavorites(data.map(f => f.movieId));
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const toggleFavorite = async (movieId: string) => {
    try {
      const isFav = favorites.includes(movieId);
      const res = await fetch("/api/favorites", {
        method: isFav ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId }),
      });
      if (!res.ok) throw new Error("Failed to update favorite");
      setFavorites(prev =>
        isFav ? prev.filter(id => id !== movieId) : [...prev, movieId]
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMovies = movies.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (genreFilter ? m.genre.includes(genreFilter) : true)
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">All Movies</h2>
      {filteredMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:border-red-500 animate-fadeIn"
            >
              <SafeImage
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="w-full h-56 object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                <p className="text-zinc-400 mt-1 line-clamp-3">{movie.description}</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Genres: {movie.genre.join(", ")}
                </p>
                <p className="text-zinc-400 text-sm">
                  Duration: {movie.duration ? `${movie.duration} min` : "—"}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <a
                    href={movie.videoUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black px-3 py-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Watch
                  </a>
                  <button
                    onClick={() => toggleFavorite(movie.id)}
                    className={`text-2xl ${
                      favorites.includes(movie.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    ♥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
