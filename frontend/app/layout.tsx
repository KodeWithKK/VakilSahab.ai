import { Inter } from "next/font/google";
import type { Metadata } from "next";

import ContextsProvider from "@/contexts";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VakilSahab.ai",
  description: "Your AI companion for instant legal insights and assistance.",
  icons: "/icon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ContextsProvider>{children}</ContextsProvider>
      </body>
    </html>
  );
}
