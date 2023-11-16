"use client";

import Image from "next/image";
import NameForBlog from "./NameForBlog";
import BlogText from "./BlogText";
import LikeButton from "../others/LikeButton";
import CommentButton from "../others/CommentButton";
import formatDate from "../../../lib/formatDate";
import { useSelector } from "react-redux";
import { getTheme } from "../../../utils/slices/UiSlice";

type BlogType = {
  blog: Blog;
  userName?: string;
  userLikedBlogs?: string[];
  userId?: string;
  userBlog?: boolean;
};

function BlogContainer({ blog, userName, userLikedBlogs, userBlog }: BlogType) {
  const theme = useSelector(getTheme);

  const {
    img: blogImg,
    title,
    content,
    createdAt,
    likes,
    comments,
    _id: blogId,
  } = blog;
  const { name } = blog.user;
  const { day, month }: formattedDateType = formatDate(createdAt);

  return (
    <>
      <NameForBlog
        name={name || (userName as string)}
        day={day}
        month={month}
      />

      {userBlog && (
        <p className="text-slate-500 font-semibold text-xs -mt-2">(You)</p>
      )}

      <div className="flex flex-col gap-0.5 font-medium">
        <p
          className={`${theme === "dark" ? "text-blue-300" : "text-blue-600"}`}
        >
          {title}
        </p>

        <BlogText content={content} />

        {blogImg && (
          <Image
            src={blogImg}
            alt="blog-img"
            width={1000}
            height={1000}
            className="w-full h-auto mt-5"
          />
        )}
      </div>

      <div className="flex gap-5 text-sm mt-3">
        <LikeButton
          userLikedBlogs={userLikedBlogs}
          blogId={blogId}
          likes={likes}
        />
        <CommentButton comments={comments} />
      </div>
    </>
  );
}
export default BlogContainer;
