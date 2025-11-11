import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Combination Sum Lengths",
  description: "Compute the sum of lengths for combination sums"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
