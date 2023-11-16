"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../utils/slices/SubNavSlice";
import { getTheme, setBottomNavLink } from "../../../utils/slices/UiSlice";

export const Blog = ({
  children,
  blogId,
  name,
  userName,
}: {
  children: React.ReactNode;
  blogId: string;
  name: string;
  userName: string;
}) => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  function handleClick() {
    dispatch(setBottomNavLink(""));
    dispatch(setTitle(name || userName || "Loading"));
  }

  return (
    <Link
      href={`/blogs/${blogId}`}
      className={`${
        theme === "dark" ? "bg-[#111]" : "bg-gray-300"
      } px-3 py-4 rounded-xl overflow-x-hidden`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
