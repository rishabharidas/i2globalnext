import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "i2globaltest - assigmnet",
  description: "Test assignment for i2global project evaluation and assessment",
  keywords: "i2global, test, assignment, evaluation, assessment",
  openGraph: {
    title: "i2globaltest - assigmnet",
    description:
      "Test assignment for i2global project evaluation and assessment",
    type: "website",
    locale: "en_US",
    siteName: "i2globaltest",
  },
  twitter: {
    card: "summary_large_image",
    title: "i2globaltest - assigmnet",
    description:
      "Test assignment for i2global project evaluation and assessment",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
