import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usemelabs.com"),
  title: {
    default: "UseMe Labs",
    template: "%s | UseMe Labs",
  },
  description:
    "UseMe Labs \u2013 ultramoderni lietuvi\u0173 kalbai pritaikyti AI superasistentai ir agent\u0173 ekosistema.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="lt" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
