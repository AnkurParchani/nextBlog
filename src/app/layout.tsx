import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import BottomNav from "@/components/nav/BottomNav";

import "./globals.css";
import StoreProvider from "./store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-black text-gray-300 min-h-[80vh] `}
        >
          {children}
          <BottomNav />
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
