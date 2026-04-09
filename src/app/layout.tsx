import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consignment Prototype",
  description: "Fanatics Collect submission flow prototype",
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
