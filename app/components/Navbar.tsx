"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  genreFilter: string;
  setGenreFilter: (value: string) => void;
}

const genres = ["Action","Comedy","Drama","Fantasy","Horror","Sci-Fi"];

export default function Navbar({ searchQuery, setSearchQuery, genreFilter, setGenreFilter }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [openGenres, setOpenGenres] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = (path: string) => pathname === path ? "text-red-400" : "text-white hover:text-red-400";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    router.push(`/movies?search=${encodeURIComponent(e.target.value)}${genreFilter ? `&genre=${encodeURIComponent(genreFilter)}` : ''}`);
  };

  const handleGenreSelect = (g: string) => {
    setGenreFilter(g);
    setOpenGenres(false);
    router.push(`/movies?genre=${encodeURIComponent(g)}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  return (
    <nav className="sticky top-0 z-30 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link href="/home" className="flex items-center gap-2 text-2xl font-bold text-red-500">🎬 <span className="hidden sm:inline">M-Streaming</span></Link>

        <div className="hidden md:flex gap-6 ml-6 items-center">
          <Link href="/movies" className={active("/movies")}>Movies</Link>
          <Link href="/favorites" className={active("/favorites")}>Favorites</Link>

          <div className="relative">
            <button onClick={() => setOpenGenres(s => !s)} className="text-white hover:text-red-400 font-semibold">Genres ▾</button>
            {openGenres && <div className="absolute mt-2 bg-gray-800 rounded shadow-lg z-20">
              {genres.map(g => (
                <button key={g} className="block px-4 py-2 text-left w-full text-white hover:text-red-400"
                  onClick={() => handleGenreSelect(g)}
                >
                  {g}
                </button>
              ))}
            </div>}
          </div>
        </div>

        <div className="md:hidden ml-auto">
          <button onClick={() => setMobileOpen(s => !s)} className="text-white hover:text-red-400 font-semibold">☰</button>
          {mobileOpen && <div className="absolute top-14 left-0 w-full bg-gray-800 p-3 z-30">
            <Link href="/movies" className="block px-3 py-2 text-white hover:text-red-400">Movies</Link>
            <Link href="/favorites" className="block px-3 py-2 text-white hover:text-red-400">Favorites</Link>
            {genres.map(g => <button key={g} onClick={() => { setMobileOpen(false); handleGenreSelect(g); }} className="block px-3 py-2 text-white hover:text-red-400 w-full text-left">{g}</button>)}
          </div>}
        </div>

        <div className="ml-auto flex-1 max-w-md hidden sm:block">
          <input value={searchQuery} onChange={handleSearchChange} placeholder="Search title, genre..." className="w-full rounded-lg bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500" />
        </div>

        <div className="ml-4 hidden sm:block">
          <button onClick={() => signOut({ callbackUrl: "/auth" })} className="rounded-lg px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">Sign out</button>
        </div>
      </div>
    </nav>
  );
}
