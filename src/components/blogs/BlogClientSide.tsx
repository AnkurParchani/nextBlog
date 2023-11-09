"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../lib/slices/SubNavSlice";
import { setBottomNavLink } from "../../../lib/slices/UiSlice";

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

  function handleClick() {
    dispatch(setBottomNavLink(""));
    dispatch(setTitle(name || userName || "Loading"));
  }

  return (
    <Link
      href={`/blogs/${blogId}`}
      className="bg-[#111] px-3 py-4 rounded-xl"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
