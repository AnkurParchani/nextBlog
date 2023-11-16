"use client";

import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

type ButtonType = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  externalClass?: string;
};

function Button({ children, onClick, externalClass }: ButtonType) {
  const theme = useSelector(getTheme);

  return (
    <button
      onClick={onClick}
      className={`${
        externalClass ? externalClass : "bg-[#1d9bf0] hover:bg-[#51aeec] py-0.5"
      } duration-200 mt-3  rounded-sm text-base ${
        theme === "dark" ? "text-gray-100" : "text-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
