// app/layout.tsx
import "./globals.css";
import SessionWrapper from "@/app/SessionWrapper";

export const metadata = {
  title: "M-Streaming",
  description: "Movie streaming demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
