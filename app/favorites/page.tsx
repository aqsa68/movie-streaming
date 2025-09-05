// app/favorites/page.tsx
"use client";

import Navbar from "@/app/components/Navbar";
import SafeImage from "@/app/components/SafeImage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Movie {
  id: string;
  title: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  genre?: string[] | string;
  duration?: number;
}

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/favorites");
        if (!res.ok) throw new Error("Failed to fetch favorites");
        const data: Movie[] = await res.json();
        if (!mounted) return;
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const unfav = async (id: string) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId: id }),
      });
      if (!res.ok) throw new Error("Failed to remove favorite");
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Navbar - pass dummy props if your Navbar expects props */}
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        genreFilter=""
        setGenreFilter={() => {}}
      />

      <div className="h-[calc(100vh-64px)] overflow-y-auto p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-red-500">My Favorites</h1>

        {movies.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map((m) => (
              <div key={m.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 animate-fadeIn">
                <SafeImage
                  src={m.imageUrl || m.thumbnailUrl || "https://via.placeholder.com/800x400?text=No+Image"}
                  alt={m.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold">{m.title}</h2>
                  <p className="text-zinc-400 text-sm mb-1">
                    Genres: {Array.isArray(m.genre) ? m.genre.join(", ") : m.genre || "—"}
                  </p>
                  <p className="text-zinc-400 text-sm mb-1">
                    Duration: {m.duration ? `${m.duration} min` : "—"}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <a
                      href={m.videoUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white text-black px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Watch
                    </a>
                    <button
                      onClick={() => unfav(m.id)}
                      className="text-red-500 hover:text-white border border-red-500 hover:border-white px-4 py-2 rounded transition-colors"
                    >
                      ♥ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
