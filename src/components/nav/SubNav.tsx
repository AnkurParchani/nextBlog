"use client";

import { useSelector } from "react-redux";
import { getTheme } from "../../../lib/slices/UiSlice";

type DateType = {
  day: string;
  year: string;
  month: string;
};

export default function SubNav({
  heading,
  showDate,
}: {
  heading: string;
  showDate?: DateType;
}) {
  const theme = useSelector(getTheme);
  const themeColor =
    theme === "dark" ? "bg-black text-gray-200" : "bg-gray-200 text-black";

  return (
    <div
      className={`${themeColor} fixed top-11 inset-x-0 z-30 py-1.5 pb-2.5 text-lg tracking-wide border-t border-gray-800 px-4 flex gap-1.5 items-center justify-between`}
    >
      <div className="border-b-2 capitalize border-[#1d9bf0] inline-block font-normal">
        {heading}
      </div>

      {showDate && (
        <div className="text-gray-500 text-xs font-semibold">
          {showDate.month} {showDate.day}, {showDate.year}
        </div>
      )}
    </div>
  );
}
