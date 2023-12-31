import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import BottomNav from "@/components/nav/BottomNav";

import "./globals.css";
import StoreProvider from "./store/StoreProvider";
import AppBody from "./AppBody";

export const metadata: Metadata = {
  title: "Next Blog | Create your Blogs",
  description: "Generated to showcase Nextjs skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <AppBody>
          {children}
          <BottomNav />
          <Toaster />
        </AppBody>
      </html>
    </StoreProvider>
  );
}
