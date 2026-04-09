import type { Metadata } from "next";
import { ABCDiatype, ManukaBold } from "./fonts";
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
    <html lang="en" className={`${ABCDiatype.variable} ${ManukaBold.variable}`}>
      <body>{children}</body>
    </html>
  );
}
