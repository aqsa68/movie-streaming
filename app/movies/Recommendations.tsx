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

export default function Recommendations({ searchQuery, genreFilter }: Props) {
  const [recommended, setRecommended] = useState<Movie[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/movies");
        const data: Movie[] = await res.json();
        if (!mounted) return;

        const filtered = data.filter(m =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (genreFilter ? m.genre.includes(genreFilter) : true)
        );

        // Pick 6 random movies
        const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 6);
        setRecommended(shuffled);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      }
    })();
    return () => { mounted = false; };
  }, [searchQuery, genreFilter]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Recommended</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommended.map(movie => (
          <div
            key={movie.id}
            className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:border-red-500 animate-fadeIn"
          >
            <SafeImage
              src={movie.thumbnailUrl}
              alt={movie.title}
              className="w-full h-36 object-cover rounded-t"
            />
            <p className="text-white text-sm font-semibold p-2 line-clamp-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
