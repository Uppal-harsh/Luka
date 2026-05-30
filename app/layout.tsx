import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { RouteTransition } from "@/components/providers/RouteTransition";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display"
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "LUKA",
  description: "A polished AI app generator platform for building full-stack apps from JSON.",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        <ThemeProvider>
          <RouteTransition>{children}</RouteTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
