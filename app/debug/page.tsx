"use client";

import { useSession } from "next-auth/react";

export default function Debug() {
  const { data: session, status } = useSession();

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>Debug Session</h1>
      <pre>Status: {status}</pre>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
