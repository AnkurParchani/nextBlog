"use client";

import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

type PropType = {
  name: string;
  month: string;
  day: string;
  year?: string;
  blueTitle?: boolean;
};

const NameForBlog = ({ name, month, day, year, blueTitle }: PropType) => {
  const theme = useSelector(getTheme);
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const blueTitleColor = theme === "dark" ? "text-blue-300" : "text-blue-600";

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-1">
        <p
          className={`${
            blueTitle ? blueTitleColor : textColor
          } font-medium capitalize`}
        >
          {name}
        </p>
        <p className="text-gray-500 -mt-1.5">.</p>
        <p className="text-gray-500 text-sm">
          {month} {day}
          {year && `, ${year}`}
        </p>
      </div>
    </div>
  );
};

export default NameForBlog;
