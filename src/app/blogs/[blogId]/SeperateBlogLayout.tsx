"use client";

import LikeButton from "@/components/others/LikeButton";
import formatDate from "../../../../lib/formatDate";
import NameForBlog from "@/components/blogs/NameForBlog";

import { AccountCircle } from "@mui/icons-material";
import CommentButton from "@/components/others/CommentButton";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../utils/slices/UiSlice";

// Blog Section
export function Blog({
  content,
  likes,
  name,
  hasCommentFunctionality,
  blogId,
  comments,
  userLikedBlogs,
  img: blogImg,
}: {
  content: string;
  likes: number;
  hasCommentFunctionality?: boolean;
  comments: number;
  blogId: string;
  img: string;
  name: string;
  userLikedBlogs: string[];
}) {
  const theme = useSelector(getTheme);

  return (
    <div
      className={`pb-12 pt-2 px-2.5 ${
        theme === "dark" ? "bg-slate-900" : "bg-gray-300"
      } rounded-md`}
    >
      <p
        className={`font-normal ${
          theme === "dark" ? "text-gray-300" : "text-gray-800"
        } leading-relaxed tracking-wide`}
      >
        {content}
      </p>

      {blogImg && (
        <Image
          src={blogImg}
          alt="blog-img"
          height={1000}
          width={1000}
          className="w-5/6 mx-auto mt-5 h-auto rounded-sm "
        />
      )}

      <div className="mt-5 flex justify-between px-1">
        <div className="flex gap-3">
          <LikeButton
            blogId={blogId}
            userLikedBlogs={userLikedBlogs}
            likes={likes}
          />
          <CommentButton
            blogId={blogId}
            hasCommentFunctionality
            comments={comments}
          />
        </div>
        <p
          className={`${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          } font-semibold uppercase text-sm tracking-wide`}
        >
          - {name}
        </p>
      </div>
    </div>
  );
}

// Intersection
export function InterSection() {
  const theme = useSelector(getTheme);

  return (
    <div className="flex justify-center items-end h-16 border-x-2 mx-2 border-blue-400">
      <span
        className={`uppercase ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Comments
      </span>
    </div>
  );
}

// Comments section
type CommentType = {
  _id: string;
  isEdited: boolean;
  content: string;
  blog: string;
  user: User;
  createdAt: string;
};

export function Comment({ comment }: { comment: CommentType }) {
  const theme = useSelector(getTheme);

  const {
    isEdited,
    content,
    createdAt,
    user: { name, img: userImg },
  } = comment;

  const { month, day, year } = formatDate(createdAt);

  return (
    <>
      <div className="h-3 border-x-2 mx-2 border-blue-400" />
      <div
        className={`pb-8 pt-2 px-2.5 ${
          theme === "dark" ? "bg-slate-900" : "bg-gray-300"
        } rounded-md`}
      >
        {/* If no image of the user */}
        <div className="flex gap-2">
          {userImg ? (
            <Image
              src={userImg}
              alt="user-img"
              height={1000}
              width={1000}
              className="rounded-full h-8 w-8"
            />
          ) : (
            <AccountCircle style={{ fontSize: "40px", color: "#9CA3AF" }} />
          )}

          <div>
            <NameForBlog
              blueTitle
              name={name}
              month={month}
              day={day}
              year={year}
            />
            {isEdited && <p className="text-gray-400 text-sm">(Edited)</p>}
            <p
              className={`mt-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
