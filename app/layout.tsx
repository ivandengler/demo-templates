import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Templates",
  description: "Website demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <Link
          href="/"
          className="fixed bottom-4 right-4 z-50 bg-zinc-900/80 backdrop-blur text-white/60 text-xs px-3 py-2 rounded-full hover:text-white transition-colors border border-white/10"
        >
          ← Ver todos los demos
        </Link>
      </body>
    </html>
  );
}
