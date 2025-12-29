import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/lib/game/GameContext";

export const metadata: Metadata = {
  title: "ImpostWho?",
  description: "A social deduction party game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
