"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/auth");
  }, [status, router]);

  if (status === "loading")
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  if (!session) return null;

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/bg.webp')" }}
    >
      {/* Navbar with logo top-left */}
      <nav className="absolute top-4 left-4 z-20">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="h-16 w-auto cursor-pointer"
          onClick={() => router.push("/home")}
        />
      </nav>

      {/* Centered content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-70 p-8 rounded-md max-w-3xl w-full text-center shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-green-400">
            Welcome, {session.user?.name || session.user?.email}
          </h1>
          <p className="mb-6">Enjoy your recommended movies.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/movies")}
              className="bg-white text-black px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
            >
              Go to Movies
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/auth" })}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
