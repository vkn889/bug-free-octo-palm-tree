import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viraat Krishna Nellutla — Developer · Researcher · Builder",
  description: "Portfolio of Viraat Krishna Nellutla — building at the intersection of technology, medicine, and human impact.",
  keywords: ["Viraat Nellutla", "developer", "portfolio", "AI", "machine learning", "iOS", "full-stack"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
