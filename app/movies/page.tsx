"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Recommendations from "./Recommendations";
import MoviesList from "./MoviesList";

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
      />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-64px)] p-4 space-y-8">
        {/* Recommended movies */}
        <Recommendations searchQuery={searchQuery} genreFilter={genreFilter} />

        {/* All movies list */}
        <MoviesList searchQuery={searchQuery} genreFilter={genreFilter} />
      </div>
    </main>
  );
}
