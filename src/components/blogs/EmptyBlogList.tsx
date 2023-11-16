"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

const EmptyBlogList = ({
  content,
  icon,
  linkContent,
  linkTo,
}: {
  content: string;
  icon: React.ReactNode;
  linkContent?: string;
  linkTo?: string;
}) => {
  const theme = useSelector(getTheme);

  return (
    <div className="flex flex-col mt-10 gap-2 items-center">
      {icon}
      <p className="font-semibold  text-center text-gray-500">{content}</p>
      {linkTo && (
        <Link
          className={`mt-3 ${
            theme === "dark" ? "bg-[#111]" : "bg-gray-200 border border-black"
          } text-blue-400 py-2 px-6 font-medium rounded-md`}
          href={linkTo}
        >
          {linkContent}
        </Link>
      )}
    </div>
  );
};

export default EmptyBlogList;
