"use client";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { BlogWithoutLink } from "./BlogWithoutLink";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../utils/slices/UiSlice";

const Blog = ({
  blog,
  userImg,
  userLikedBlogs,
}: {
  blog: Blog;
  userImg: string | undefined;
  userLikedBlogs: string[];
}) => {
  const theme = useSelector(getTheme);

  return (
    <div
      key={blog._id}
      className={`${
        theme === "dark" ? "bg-[#111]" : "bg-gray-300"
      } px-3 py-4 rounded-xl flex gap-2 items-start`}
    >
      {userImg ? (
        <Image
          src={userImg}
          alt="user-img"
          className="rounded-full w-8 h-8"
          height={300}
          width={300}
        />
      ) : (
        <AccountCircleIcon style={{ fontSize: "40px", color: "#9CA3AF" }} />
      )}

      <BlogWithoutLink userLikedBlogs={userLikedBlogs} blog={blog} />
    </div>
  );
};

export default Blog;
