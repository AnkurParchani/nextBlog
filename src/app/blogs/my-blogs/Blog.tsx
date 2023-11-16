"use client";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BlogWithoutLink } from "@/app/users/blogs/BlogWithoutLink";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../utils/slices/UiSlice";

type BlogType = {
  blog: Blog;
  user: User;
  userLikedBlogs: string[];
};

const Blog = ({ blog, user, userLikedBlogs }: BlogType) => {
  const theme = useSelector(getTheme);
  const { img: userImg, _id: userId } = user;

  return (
    <div
      key={blog._id}
      className={`${
        theme === "dark" ? "bg-[#111]" : "bg-gray-300"
      } px-3 py-4 rounded-xl flex gap-2 items-start overflow-x-clip`}
    >
      {userImg ? (
        <Image
          src={userImg}
          alt="user-img"
          height={1000}
          width={1000}
          className="h-8 w-8 rounded-full"
        />
      ) : (
        <AccountCircleIcon className="text-4xl text-gray-400" />
      )}

      <div className="flex-grow">
        <BlogWithoutLink
          userId={userId}
          userLikedBlogs={userLikedBlogs}
          blog={blog}
        />
      </div>
    </div>
  );
};

export default Blog;
