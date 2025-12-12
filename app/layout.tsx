import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/lib/providers";
import "./globals.css";

// Remove unused font config for now or keep default Inter if generated
// Simplifying for now based on shadcn defaults

export const metadata: Metadata = {
  title: "Token Trading Table",
  description: "Eterna Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
