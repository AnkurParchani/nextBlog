"use client";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import { getTheme } from "../../lib/slices/UiSlice";

type AppBodyType = { children: React.ReactNode };

const inter = Inter({ subsets: ["latin"] });

const AppBody = ({ children }: AppBodyType) => {
  const theme = useSelector(getTheme);

  return (
    <body
      className={`${inter.className} ${
        theme === "dark"
          ? "bg-black text-gray-300"
          : "bg-gray-200 text-[#1d1d1f]"
      } overflow-x-hidden min-h-[80vh] `}
    >
      {children}
    </body>
  );
};

export default AppBody;
