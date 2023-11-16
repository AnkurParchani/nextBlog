"use client";

import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

type ModalInfoCardType = {
  month?: string;
  day?: string;
  title: string;
  contentToShow: string;
};

const ModalInfoCard = ({
  month,
  day,
  title,
  contentToShow,
}: ModalInfoCardType) => {
  const theme = useSelector(getTheme);

  return (
    <div
      className={`px-4 flex flex-col gap-3 ${
        theme === "dark" ? "bg-[#333]" : "bg-gray-200"
      } rounded-md py-3 `}
    >
      <div className="flex gap-3 justify-between">
        <h1
          className={`capitalize font-medium ${
            theme === "dark" ? "text-red-300" : "text-red-600"
          }`}
        >
          {title}
        </h1>
        <p className="text-xs font-semibold">
          {month} {day}{" "}
        </p>
      </div>
      <h1 className="leading-normal text-sm tracking-wide">{contentToShow}</h1>
    </div>
  );
};

export default ModalInfoCard;
